// import react from "react";
import { useContacs } from "../context-providers/ContactProvider";
import "../css/contact.css"

const Contact = ({name, contact, index, image, closeSidebar}) => {
    const {selectedConversationIndex, setSelectedConversationIndex } = useContacs();

    const getBackgroundColor = () => {
        return selectedConversationIndex === index ? "var(--message-input-color)" : ""
    }

    const handleClick = () => {
        setSelectedConversationIndex(index);
        closeSidebar();
    }

    return(
        <div onClick={() => {handleClick()}} className="contact" style={{backgroundColor: getBackgroundColor()}}>
            <img src={image} alt="avater" className="contact__avater" />
            <div className="contact__name">
                <h4>{name}</h4>
                <h5 className="contact__chat-id">{contact}</h5>
            </div>
        </div>
    )
} 

export default Contact;