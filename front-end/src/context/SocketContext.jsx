import { createContext, useContext } from "react";
import { io } from "socket.io-client";

let socket = io(process.env.REACT_APP_SITE_URL);

const SocketPro = createContext();

export const GetSocket = () => {
  return useContext(SocketPro);
};

function SocketContext({ children }) {
  return <SocketPro.Provider value={{ socket }}>{children}</SocketPro.Provider>;
}

export default SocketContext;
