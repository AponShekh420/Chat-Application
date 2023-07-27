import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import { AuthValue } from "../../context/AuthContext";
import { GetSocket } from "../../context/SocketContext";
import { menuOpen } from "../../redux/reducers/menuReducer";
import User from "../common/User";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Sidebar() {
  const { user: loginUser, setSelectedChat, selectedChat } = AuthValue();
  const dispatch = useDispatch();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const socketObject = GetSocket();
  const socket = socketObject.socket;
  const ChatBox = (chat, user) => {
    socket.emit("leave-chat", selectedChat?.chat?._id);
    setSelectedChat({ chat: chat, otherUser: user });
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:3000/api/chat", {
          withCredentials: true,
        });

        if (data.errors) {
          return;
        } else {
          setChats(data.chats);
          setLoading(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchChats();
  }, [refresh]);
  useEffect(() => {
    socket.on("reload chat", () => {
      setRefresh(!refresh);
    });
  });
  return (
    <div
      className={`lg:w-3/12 w-full lg:block bg-[#D9D9D9] lg:h-5/6 h-full lg:rounded-2xl lg:mt-11 overflow-hidden ${
        selectedChat.chat ? "hidden" : "block"
      }`}
    >
      {/* sidebar header */}
      <div className="w-full h-16 block invisible lg:hidden"></div>
      <div className="w-full h-11 lg:rounded-t-2xl rounded-none  lg:bg-[#58594A] flex justify-center items-center lg:shadow-[#2c2b2b] lg:shadow-md lg:mb-2 mb-1 mt-1 lg:mt-0">
        <div className="w-5/6 flex justify-between items-center">
          <AiOutlineSearch
            size={25}
            color="white"
            cursor="pointer"
            className="bg-black h-8 w-8 rounded-md text-white shadow-[#2c2b2b] shadow-md lg:bg-transparent  lg:rounded-none lg:shadow-none"
            onClick={() => dispatch(menuOpen())}
          />
          <button className="lg:bg-white lg:text-black bg-black py-1 px-2 rounded-lg text-sm font-semibold lg:hover:bg-black hover:bg-stone-900 lg:hover:text-white text-white shadow-[#2c2b2b] shadow-md">
            Create Group
          </button>
        </div>
      </div>

      {/* chatList */}

      <div
        className={`w-full overflow-auto h-container ${
          loading || chats.length === 0
            ? "flex justify-center items-center"
            : null
        }`}
      >
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
        ) : chats.length > 0 ? (
          chats.map((chat) =>
            chat.users.map((user, userIndex) => {
              if (user._id === loginUser.id) {
                return;
              } else {
                return (
                  <User
                    user={user}
                    chat={chat}
                    handler={ChatBox}
                    key={userIndex}
                  />
                );
              }
            })
          )
        ) : (
          <div className="w-fit h-fit">
            <h1 className="text-lg font-bold">
              No users have been added to the chat
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
