import React from 'react';
import { bindActionCreators } from "redux";
import {connect} from 'react-redux';
import ReceivedMessageCell from "./ReceivedMessageCell/index";
import SentMessageCell from "./SentMessageCell/index";


class Conversation extends React.Component {
    componentDidMount(){
        console.log(this.props);
     }
    render() {
        let { conversationData, selectedStartup, selectedStartupThread } = this.props.discussion;
        let authUser = this.props.authUser;
        let conversation = conversationData[selectedStartup][selectedStartupThread];
        return (
            <div className="chat-main-content">
                {conversation.map((data, index) => {
                    
                    if (data.sentBy.email === authUser.email) {
                        return <SentMessageCell key={index} conversation={data} />
                    } else {
                        return <ReceivedMessageCell key={index} conversation={data} />
                    }
                   }  
                )}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let discussion = state.discussion;
    let authUser = state.auth.authUser;
    return { discussion, authUser };
}
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       createThread: bindActionCreators(createThread, dispatch),
//       watchOnThread: bindActionCreators(watchOnThread, dispatch)
//     }
//   }
  
export default connect(mapStateToProps)(Conversation);