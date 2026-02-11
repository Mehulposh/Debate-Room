import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

//create context
const SocketContext = createContext()


//function for socket provider
export const SocketProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    const [loading, setloading] = useState(false)

    useEffect(() => {
        try {
            setloading(true)

            //storing the socket path
            const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000')

            setSocket(newSocket)

            return () => newSocket.close()
        } catch (error) {
            console.log(error);
            
        }finally{
            setloading(false)
        }
    },[])

    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}