import React from 'react';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {
    onBackClickFromChatPanel,
    pushComment
} from 'actions/Discussion'

class Conversation extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ''
        }
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage() {
        let message = this.state.message;
        this.setState({
            message: ''
        });
        let authUser = this.props.authUser;
        let comment = {
            message,
            createdAt: new Date().toISOString(),
            sentBy: {
                email: authUser.email,
                displayName: authUser.displayName,
                photoURL: authUser.photoURL
            }
        }
        let { selectedStartup, selectedStartupThread } = this.props.discussion;
        this.props.pushComment({ comment, selectedStartup, selectedStartupThread })
    }

    handleInput(evt) {
        if (evt.key === 'Enter') {
            this.sendMessage();
        }
    }
    
    componentDidMount(){
        console.log(this.props);
     }

    render() {
        let { conversationData, selectedStartup, selectedStartupThread, threads } = this.props.discussion;
        let authUser = this.props.authUser;
        let conversation = conversationData[selectedStartup][selectedStartupThread];
        let title = threads[selectedStartup][selectedStartupThread].title;
        return (
            <div className="chat-box">
                <div className="chat-box-main">
                    <div className="chat-main flex-column">
                    <div className="chat-main-header">
                            <Button variant="raised" className="m-1" color="primary" onClick={()=> {
                                this.props.onBackClickFromChatPanel();
                            }}>Back</Button>
                            <Typography align="right" className="m-1" color="primary" variant="title">{title}</Typography>
                        </div>
                    </div>
                    <div className="chat-list-scroll scrollbar">
                        <div className="chat-main-content">
                            {
                                Object.keys(conversation).map((key) => {
                                    let data = conversation[key];
                                if (data.sentBy.email === authUser.email) {
                                    return <SentMessageCell key={key} conversation={data} />
                                } else {
                                    return <ReceivedMessageCell key={key} conversation={data} />
                                }
                            }  
                            )}
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
                                        onChange={e => this.setState({message: e.target.value})}
                                        onKeyPress={this.handleInput.bind(this)}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="chat-sent">
                                <Button color="primary" variant="raised" onClick={this.sendMessage}>Send message</Button>
                                </div>
                            </div>
                     </div>
                 </div>
        )
    }
}
const mapStateToProps = (state) => {
    let discussion = state.discussion;
    let authUser = state.auth.authUser;
    return { discussion, authUser };
}
  
  const mapDispatchToProps = dispatch => {
    return {
      pushComment: bindActionCreators(pushComment, dispatch),
      onBackClickFromChatPanel: bindActionCreators(onBackClickFromChatPanel, dispatch)
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);