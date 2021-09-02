import React, { useState, useCallback } from "react";
import { useContacs } from "../context-providers/ContactProvider";
import { useSocket } from "../context-providers/SocketProvider";
import useLocalStorage from "../hooks/useLocalStorage";
import Message from "./Message";

const Conversation = () => {
    const [messageInput, setMessageInput] = useState("");
    const [isDark, setIsDark] = useState(true);
    const { selectedConversation, selectedConversationIndex, addConversationToContact} = useContacs();
    const socket = useSocket();
    const [user] = useLocalStorage("user");
    const { name, phoneNumber, conversation, image } = selectedConversation;

    const sendMessage = (e) => {
        e.preventDefault();

        if(socket && messageInput){
            socket.emit("send-message", {messageInput, phoneNumber, sender: user.phoneNumber});
            addConversationToContact(messageInput, getTime(), true, selectedConversationIndex);
        }
        setMessageInput("")
    };

    ////// THEME CONTROL BUTTON  ///////
    const onThemeButtonClick = (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark");
        setIsDark((D) => (D = !D));
    };

    const sendLove = (e) => {
        e.preventDefault();

        if(socket){
            socket.emit("send-message", {messageInput: "❤️", phoneNumber, sender: user.phoneNumber});
            addConversationToContact("❤️", getTime(), true, selectedConversationIndex);
        }
    }

    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({smooth: true})
        }
    }, [])

    return (
        <>
            <div className="chat__right-top">
                <div className="chat__contact-wraper">
                    <img
                        src={image}
                        alt="avater"
                        className="chat__contact-img"
                    />
                    <div className="chat__contact-details">
                        <h3 className="chat__contact-name">{name}</h3>
                        {/* <div className="chat__contact-status">Online</div> */}
                    </div>
                </div>
                <button onClick={onThemeButtonClick} className="chat__theme-button">
                    <i className={`fas fa-2x fa-${isDark ? "sun" : "moon"}`}></i>
                </button>
            </div>
            <div className="chat__main-section">
                <div className="chat__main-space"/>
                {
                    conversation.map((messagePacket, i) => {
                        const lastMessage = conversation.length - 1 === i;
                        return <Message focus={lastMessage ? setRef : null} key={i} text={messagePacket.text} time={messagePacket.time} isMe={messagePacket.isMe} />
                    })
                }
            </div>
            <div className="chat__bottom-wrapper">
                <form onSubmit={sendMessage} className="chat__input">
                    <input
                        onChange={(e) => setMessageInput(e.target.value)}
                        type="text"
                        className="chat__message-input"
                        placeholder="Type Something..."
                        value={messageInput}
                    />
                    <button onClick={sendLove} type="button" className="chat__imogi-btn">
                        <i className="fa-2x fas fa-heart"></i>   
                    </button>
                    <button type="submit" className="chat__send-btn">
                        <i className="fas fa-2x fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

function getTime() {
    const time = new Date();
   return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
}

export default Conversation;
