import React, {useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

const SERVER = "https://bartalap-chat-app.herokuapp.com/"

export function useSocket(){
    return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState()
    
    useEffect(() => {
        var newSocket = io(SERVER);

        setSocket(newSocket);
        return () => newSocket.close();
    }, []);
    
    

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;

