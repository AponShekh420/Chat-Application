import axios from "axios";
import Lottie from "lottie-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";
import { AuthValue } from "../../context/AuthContext";
import { GetSocket } from "../../context/SocketContext";
import animationData from "../animations/typing.json";
const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
let chatIntervel;
function ChatBox() {
  const { selectedChat, user: loginUser } = AuthValue();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [messageChange, setMessageChange] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const socketObject = GetSocket();
  const socket = socketObject.socket;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket.emit("setup", loginUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [loginUser, socket]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message) {
      try {
        setMessage("");
        setIsTyping(false);
        const { data } = await axios.post(
          "http://localhost:3000/api/chat/message",
          {
            content: message,
            chat: selectedChat.chat._id,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        socket.emit("new chat", selectedChat.chat);
        setMessageList([data.message, ...messageList]);
        socket.emit("new message", data.message);
        setMessageChange(true);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      toast.error("write Somthing first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });
    }
  };
  const fetchMessage = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/chat/message?chatId=${selectedChat.chat._id}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      socket.emit("join-chat", selectedChat?.chat?._id);
      if (data.message) {
        setMessageList(data.message);
        setMessageChange(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchMessage();
  }, [selectedChat.chat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChat.chat ||
        selectedChat.chat._id !== newMessageRecieved.chat._id
      ) {
        //
      } else {
        setMessageList([newMessageRecieved, ...messageList]);
      }
    });
  });

  const writeMessage = (e) => {
    e.preventDefault();
    clearTimeout(chatIntervel);
    setMessage(e.target.value);

    socket.emit("typing", selectedChat.chat._id);
    chatIntervel = setTimeout(() => {
      socket.emit("stop typing", selectedChat.chat._id);
    }, 2000);
  };

  return (
    <div
      className={`lg:w-8/12 lg:h-5/6 bg-[#D9D9D9] h-full w-full lg:rounded-2xl lg:mt-11 lg:flex flex-col  overflow-hidden ${
        selectedChat.chat
          ? "flex items-center justify-between"
          : "hidden items-center justify-center"
      }`}
    >
      {selectedChat.chat ? (
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="w-full h-12 lg:rounded-t-2xl bg-[#58594A] flex justify-center items-center shadow-[#2c2b2b] shadow-md z-20">
            <div className="w-5/6 flex justify-between items-center">
              <div className="w-3/6 flex items-center justify-start lg:text-3xl text-xl text-white font-bold capitalize">
                {selectedChat?.otherUser?.name}
              </div>
              <div className="w-3/6 flex justify-end items-center">
                <div className="profile w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  {/* <FaUserCircle className="text-5xl bg-[#0E95BF] rounded-full text-white cursor-pointer select-none" />{" "} */}
                  <img
                    src={`http://localhost:3000/uploads/avatars/${selectedChat?.otherUser?.avatar}`}
                    alt="Profile Picture"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`chatbox flex h-full w-full overflow-y-auto p-3 ${
              loading
                ? "items-center justify-center flex-row"
                : "justify-start items-start flex-col-reverse"
            }`}
          >
            {/* here would all messages */}
            {loading ? (
              <div className="w-fit h-fit">
                <h1 className="text-lg font-bold">
                  <SyncLoader
                    color="#17AEC9"
                    loading={loading}
                    cssOverride={CSSProperties}
                    size={28}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </h1>
              </div>
            ) : (
              messageList.map((message, index) => (
                <div
                  className={`w-full h-fit mt-1 lg:mt-3 flex flex-col ${
                    message?.senderId._id != loginUser.id
                      ? "items-start"
                      : "items-end"
                  }`}
                  key={Math.random() * 300 + index}
                >
                  <div
                    className={`lg:w-5/6 w-4/6 h-fit flex flex-col ${
                      message?.senderId._id != loginUser.id
                        ? "items-start"
                        : "items-end"
                    }`}
                  >
                    <div className="w-fit flex items-end gap-x-2">
                      <div
                        className={`profile w-7 h-7 rounded-full overflow-hidden flex items-center justify-center ${
                          message?.senderId._id != loginUser.id &&
                          messageList[index + -1]?.senderId._id !=
                            message?.senderId._id
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        {/* <FaUserCircle className="text-5xl bg-[#0E95BF] rounded-full text-white cursor-pointer select-none" />{" "} */}
                        <img
                          src={`http://localhost:3000/uploads/avatars/${selectedChat?.otherUser?.avatar}`}
                          alt="Profile Picture"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div
                        className={`w-fit py-1 px-2 h-fit  flex flex-col  ${
                          message?.senderId._id != loginUser.id
                            ? "rounded-t-xl rounded-br-xl bg-white text-black"
                            : "rounded-t-xl rounded-bl-xl bg-blue-600 text-white"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                    {/* start */}

                    {messageList[index - 1]?.senderId._id !=
                    message?.senderId._id ? (
                      <div className="time ml-8">
                        <p>{moment(message.createdAt).fromNow()}</p>
                      </div>
                    ) : null}
                    {/* end */}
                  </div>
                </div>
              ))
            )}

            {/* end here */}
          </div>

          <div className="w-full h-fit flex-col bg-transparent  flex justify-center items-start lg:px-10 px-3">
            {isTyping ? (
              <div className="ml-9 lg:ml-2">
                <Lottie
                  // options={defaultOptions}
                  animationData={animationData}
                />
              </div>
            ) : (
              <div></div>
            )}
            <form
              action="http://localhost:3000/api/chat/message"
              className="flex w-full py-2"
              method="post"
              onSubmit={sendMessage}
            >
              {/* <Lottie options={defaultOptions} height={40} width={40} /> */}

              <input
                name="message"
                id="message"
                className="w-full px-2 border-y-2 border-l-2 rounded-l-xl border-[#1f1e1f] focus:outline-none"
                placeholder="write your message"
                onChange={writeMessage}
                value={message}
              />
              <button
                type="submit"
                className="w-28 rounded-r-xl  py-1 px-3  bg-black text-white font-semibold text-xl flex justify-center items-center gap-x-2 "
              >
                Send <LuSend />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold">No chats have been selected</h1>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
