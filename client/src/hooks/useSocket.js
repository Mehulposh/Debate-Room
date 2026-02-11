import { useContext } from "react";
import {SocketContext} from '../context/socketContext.jsx'


export const useSocket = () => {
    //using useContext to use SocketContext 
    const context = useContext(SocketContext)

    //error handling in case the context is not created
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    //return the context
    return context;
}