import React from "react";
import Join from "./components/Join";
import Chat from "./components/Chat";
import "./css/base.css";
import "./css/join.css";
import "./css/chat.css";
import "./css/modal.css";
import "./css/addContact.css";
import useLocalStorage from "./hooks/useLocalStorage";
import SocketProvider from "./context-providers/SocketProvider";
import ContactProvider from "./context-providers/ContactProvider";

const App = () => {
   const [user, setUser] = useLocalStorage("user");

   const chat = (
      <ContactProvider>
         <Chat user={user} />
      </ContactProvider>
   )

   return(
      <SocketProvider>
         {user ? chat : <Join setUser={setUser} />}   
      </SocketProvider>
   ) 
};

export default App;
