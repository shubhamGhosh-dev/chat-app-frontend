import React, { useEffect, useState } from "react";
import { useContacs } from "../context-providers/ContactProvider";
import { useSocket } from "../context-providers/SocketProvider";
import AddContact from "./AddContact";
import Contact from "./Contact";
import Conversation from "./Conversation";

const Chat = ({user}) => {
   const { contacts } = useContacs();
   const socket = useSocket();
   const [sidebar, setSidebar] = useState(false)

   const toggleSidebar = () => setSidebar(!sidebar);

   const closeSidebar = () => {
       if(sidebar){
           setSidebar(!sidebar);
       }
   }
   
   useEffect(() => {
       if (socket){
         socket.emit(
            "join-request",
            { name: user.name, phoneNumber: user.phoneNumber },
            ({ message, isRegistered }) => {
               if (isRegistered) {
                  console.log("Successfully registered");
               } else {
                  alert(message);
               }
            }
         );
      }
   }, [socket, user.name, user.phoneNumber]);


   const notSelectedTemplate = (
      <div className="chat__right-not-selected">
        <img src="img/logo-light.png" alt="LOGO"></img>
         <h1>Welcome to বার্তালাপ</h1>
         <p className="chat__right-not-selected-p">
            Just Add a Contact by pressing add contact button and you are ready to chat.
         </p>
      </div>
   );

   return (
    <>
        <div className="chat__top-bar">
            <i className="fas fa-2x fa-bars" onClick={toggleSidebar}></i>
        </div>
        <div className="chat">
            <div className="chat__container">
                <div className={`chat__left ${sidebar ? "active" : ""}`}>
                    <div className="chat__user-details">
                        <div className="chat__user-img-box">
                            <img
                                src="img/avater.png"
                                alt="avater"
                                className="chat__user-img"
                            />
                        </div>
                        <h2 className="chat__user-name">{user.name}</h2>
                        <h3 className="chat__user-phoneNumber">{user.phoneNumber}</h3>
                    </div>
                    <span className="chat__right-devider"></span>
                    <div className="chat__contacts-wrapper">
                        {contacts.map((contact, index) => {
                            return (
                                <Contact
                                    name={contact.name}
                                    contact={contact.phoneNumber}
                                    image={contact.image}
                                    key={index}
                                    index={index}
                                    closeSidebar ={closeSidebar}
                                />
                            );
                        })}
                    </div>
                    <AddContact />
                </div>
                <div className={`chat__right ${sidebar ? "chat__right-dim" : ""}`}>
                    <div className="chat__right-wrapper">
                        {contacts.length === 0 ? notSelectedTemplate : <Conversation />}
                    </div>
                </div>
            </div>
        </div>
    </>
   );
};

export default Chat;
