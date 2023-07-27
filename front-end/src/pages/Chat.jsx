import ChatBox from "../component/chatCom/ChatBox";
import Header from "../component/chatCom/Header";
import Menu from "../component/chatCom/Menu";
import Sidebar from "../component/chatCom/Sidebar";
const Chat = () => {
  return (
    <div className="w-full h-screen bg-[#278fb8] relative">
      <Header />
      <div className="w-full flex justify-center items-center h-full lg:gap-x-3 absolute top-0 z-10">
        <Sidebar />
        <ChatBox />
      </div>
      <Menu />
    </div>
  );
};

export default Chat;
