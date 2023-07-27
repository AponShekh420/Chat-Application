import { createContext, useContext } from "react";
import { io } from "socket.io-client";

let socket = io("http://localhost:3000");

const SocketPro = createContext();

export const GetSocket = () => {
  return useContext(SocketPro);
};

function SocketContext({ children }) {
  return <SocketPro.Provider value={{ socket }}>{children}</SocketPro.Provider>;
}

export default SocketContext;
