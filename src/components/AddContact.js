import React,{useState, useRef, useEffect} from 'react'
import { useContacs } from '../context-providers/ContactProvider';
import Modal from './Modal';

const AddContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const { contacts, createContact, updateContactName, rendeomImage } = useContacs();
    let inputRef = useRef()

    const handleSubmit = (event) => {
        event.preventDefault();

        setName("")
        setPhoneNumber("")
        setIsOpen(false)

        if(name && phoneNumber){
            const exists = contacts.find(obj => obj.phoneNumber === phoneNumber)
            if(exists && exists.name === name){
                alert("the contact number is already exist")
            }else if(exists && exists.name !== name){
                updateContactName(name, phoneNumber);
            }else{
                createContact(name, phoneNumber, rendeomImage());
            }
        }
    }

    const hancleClick = (e) => {
        e.preventDefault();
        setIsOpen(true);
    }

    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, [isOpen])

    return (
        <div>
            <button className="addcontact__btn" onClick={hancleClick}>Add Contact</button>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <form  onSubmit={(e) => handleSubmit(e)} autoComplete="off" className="addcontact__form">
                    <input
                        ref={inputRef}
                        className="addcontact__input"
                        type="text"
                        placeholder="Name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        value={name}
                        required
                        autoComplete="off"
                        name="name"
                    />
                    <input
                        className="addcontact__input"
                        type="text"
                        placeholder="Contact ID"
                        onChange={(event) => {
                            setPhoneNumber(event.target.value);
                        }}
                        value={phoneNumber}
                        required
                        autoComplete="off"
                        name="contactId"
                    />

                    <button className="addcontact__submit-btn" type="submit">Save</button>
                </form>
            </Modal>
        </div>
    )
};


export default AddContact;
