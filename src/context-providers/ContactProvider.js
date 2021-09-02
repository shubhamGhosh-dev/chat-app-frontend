import React, { useCallback, useContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSocket } from "./SocketProvider";

const ContactContext = React.createContext();

export function useContacs() {
    return useContext(ContactContext);
}

const ContactProvider = ({ children }) => {
    const [contacts, setContacts] = useLocalStorage("contacts", []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const socket = useSocket();

    const createContact = (name, phoneNumber, image) => {  
        setContacts((prevContact) => {
            return [...prevContact, { name, phoneNumber, conversation: [], image}];
        });
    };

    const updateContactName = (name, phoneNumber) => {
        setContacts((prevContact) => {
            const objIndex = prevContact.findIndex(obj => obj.phoneNumber === phoneNumber);
            prevContact[objIndex].name = name;
            return [...prevContact];
        })
    };

    const addConversationToContact = useCallback((text, time, isMe, index) => {
        const messagePacket = {text, time, isMe};
        
        setContacts((prevContact) => {
            if(isMe){
                prevContact[index].conversation.push(messagePacket);
                return [ ...prevContact ];
            }else{
                let senderContactIndex = prevContact.findIndex((contact) => contact.phoneNumber === index);
                if(senderContactIndex === -1){
                   return [...prevContact, { name: "Unknown", phoneNumber: index, conversation: [messagePacket], image: rendeomImage()}]; 
                }else{
                    prevContact[senderContactIndex].conversation.push(messagePacket);
                    return [ ...prevContact ];
                }
            }   
        })
    }, [setContacts])

    useEffect(() => {
        if (socket == null) return;

        socket.on("receive-message", ({text, time, sender}) => {
           addConversationToContact(text, time, false, sender);
        });
        
    }, [socket, addConversationToContact]);

    const value = {
        contacts,
        createContact,
        updateContactName,
        selectedConversationIndex,
        setSelectedConversationIndex,
        selectedConversation: contacts[selectedConversationIndex],
        addConversationToContact,
        rendeomImage
    }

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    );
};

function rendeomImage(){
    const num = Math.floor(Math.random() * 6) + 1;
    return `img/avater-${num}.png`
}

export default ContactProvider;
