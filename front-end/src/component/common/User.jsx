/* eslint-disable react/prop-types */

import { AuthValue } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
function User({ user, chat, handler }) {
  const { selectedChat } = AuthValue();
  const perams = chat ? chat : user;
  return (
    <div
      className={`flex items-center h-16 w-full justify-center gap-2 p-1 border-b-2 border-[#c7c2c2] ${
        chat
          ? selectedChat.chat?._id == chat._id
            ? "bg-[#23645c] hover:bg-[#23645c]"
            : "bg-[#eff0ec] hover:bg-[#d3d4cf]"
          : "bg-[#eff0ec] hover:bg-[#d3d4cf]"
      }  cursor-pointer `}
      onClick={() => handler(perams, user)}
    >
      <div className="profile w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
        {/* <FaUserCircle className="text-5xl bg-[#0E95BF] rounded-full text-white cursor-pointer select-none" />{" "} */}
        <img
          src={`https://chat-application-two-xi.vercel.app/uploads/avatars/${user?.avatar}`}
          alt="Profile Picture"
          className="h-full w-full object-cover"
        />
      </div>
      <div className=" w-4/5 h-full flex-col flex justify-center">
        <h1
          className={`leading-tight font-semibold text-lg ${
            chat
              ? selectedChat.chat?._id == chat._id
                ? "text-white"
                : "text-black"
              : "text-black"
          } `}
        >
          {user?.name}
        </h1>
        {chat?.latestMessage ? (
          <p className="text-sm text-[#bbb6b6] opacity-95">
            {chat?.latestMessage.senderId === user._id ? null : <b>You:</b>}{" "}
            {chat.latestMessage.content.slice(0, 25) + "..."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default User;
