import React, {useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket(){
    return useContext(SocketContext);
}

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState()
    
    useEffect(() => {
        var newSocket = io("http://localhost:5000/");

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

