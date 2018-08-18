import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import ReceivedMessageCell from "./ReceivedMessageCell"
import SentMessageCell from "./SentMessageCell"
import Button from "@material-ui/core/Button"
import FormGroup from "@material-ui/core/FormGroup"
import TextField from "@material-ui/core/TextField"
import ContainerHeader from "components/ContainerHeader/index"
import { onBackClickFromChatPanel, pushComment, fetchStartUp, watchOnThread, watchOnComments } from "actions/Discussion"
import { PulseLoader} from 'react-spinners'
import { css } from 'react-emotion'

class Conversation extends React.Component {
  constructor() {
    super()
    this.state = {
      message: ""
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const {match: {params}} = this.props
    const {startupId, threadId} = params

    this.props.fetchStartUp(startupId)
    this.props.watchOnThread(startupId)
    this.props.watchOnComments({ threadId, startupKey: startupId })
  }

  sendMessage() {
    let message = this.state.message
    this.setState({
      message: ""
    })
    let authUser = this.props.authUser
    let comment = {
      message,
      createdAt: new Date().toISOString(),
      sentBy: {
        email: authUser.email,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL
      }
    }

    this.props.pushComment({
      comment,
      selectedStartup: this.startupKey,
      selectedStartupThread: this.threadKey
    })
  }

  handleInput(evt) {
    if (evt.key === "Enter") {
      this.sendMessage()
    }
  }

  render() {
    const pulseLoaderClass = css`
      text-align: center;
      margin-top: 20px;
    `
    let { match: { params } } = this.props
    const authUser = this.props.authUser
    this.startupKey = params.startupId
    this.threadKey = params.threadId

    if (this.props.discussion.selectedStartup && this.props.discussion.conversationData && this.props.discussion.threads) {
      const { conversationData, threads } = this.props.discussion
      this.conversationForThread = conversationData[this.startupKey][this.threadKey]
      this.title = threads[this.startupKey][this.threadKey].title

      this.props.match.url = this.props.match.url.replace(this.props.match.params.startupId, this.props.discussion.selectedStartup.startUpName)
      this.props.match.url = this.props.match.url.replace(this.props.match.params.threadId, this.title)
    }

    return (this.conversationForThread && this.title) ?
    (
      <div className="app-wrapper">
        <ContainerHeader match={this.props.match} title={<span>Discussion Thread</span>} />
        <div className="chat-box flex-column">
          <div className="chat-box-main">
            <div className="chat-list-scroll scrollbar">
              <div className="chat-main-content">
                {Object.keys(this.conversationForThread).map(key => {
                  let data = this.conversationForThread[key]
                  if (data.sentBy.email === authUser.email) {
                    return <SentMessageCell key={key} conversation={data} />
                  } else {
                    return (
                      <ReceivedMessageCell key={key} conversation={data} />
                    )
                  }
                })}
              </div>
            </div>
          </div>
          <div className="chat-main-footer align-self-end">
            <div className="d-flex flex-row align-items-center">
              <div className="col">
                <FormGroup>
                  <TextField
                    placeholder="Type and hit enter to send message"
                    required={true}
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                    onKeyPress={this.handleInput.bind(this)}
                  />
                </FormGroup>
              </div>
              <div className="chat-sent">
                <Button
                  color="primary"
                  variant="raised"
                  onClick={this.sendMessage}
                >
                  Send message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    :
    <PulseLoader
      className={pulseLoaderClass}
      size={12}
      loading={true}
    />
  }
}
const mapStateToProps = state => {
  let discussion = state.discussion
  let authUser = state.auth.authUser
  return { discussion, authUser }
}

const mapDispatchToProps = dispatch => {
  return {
    pushComment: bindActionCreators(pushComment, dispatch),
    onBackClickFromChatPanel: bindActionCreators(
      onBackClickFromChatPanel,
      dispatch
    ),
    fetchStartUp: bindActionCreators(fetchStartUp, dispatch),
    watchOnComments: bindActionCreators(watchOnComments, dispatch),
    watchOnThread: bindActionCreators(watchOnThread, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation)
