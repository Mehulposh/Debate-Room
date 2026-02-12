import { useContext } from "react";
import {SocketContext} from '../context/socketContext.jsx'


export const useSocket = () => {
    //using useContext to use SocketContext 
     return useContext(SocketContext);
}