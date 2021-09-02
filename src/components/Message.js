import React from 'react';
import "../css/message.css";

const Message = ({focus, text, time, isMe}) => {
    return (
       <div ref={focus} className={`message-box ${isMe ? "message-right": ""}`}>
          <div className={`message-wrapper ${isMe ? "message-me" : "message-others"}`}>
             <div className="message">
                { text }
             </div>
             <span className="message-time">{time}</span>
          </div>
       </div>
    );
}

export default Message
