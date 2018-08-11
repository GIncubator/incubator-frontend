import React from 'react';
import moment from 'moment';

const SentMessageCell = ({conversation}) => {
    return (
        <div className="d-flex flex-nowrap chat-item flex-row-reverse">

            <img className="rounded-circle avatar size-40 align-self-end" src={conversation.sentBy.photoURL}
                 alt={conversation.sentBy.displayName}/>

            <div className="bubble">
                <div className="message">{conversation.message}</div>
                <div className="time text-muted text-right mt-2">{moment(conversation.createdAt).fromNow()}</div>
            </div>

        </div>
    )
};

export default SentMessageCell;