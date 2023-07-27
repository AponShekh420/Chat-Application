import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthValue } from "../../context/AuthContext";
function Header() {
  const { user, selectedChat } = AuthValue();
  const [subMenu, setSubMenu] = useState(false);
  const showHidden = subMenu ? "block" : "hidden";
  const shadow = subMenu ? "shadow-sm shadow-white" : "";
  const navigate = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/logout",
        null,
        {
          withCredentials: true,
        }
      );
      if (data) {
        localStorage.removeItem("userInfo");
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        navigate("/login", {
          replace: true,
        });
      } else {
        toast.error(data.errors.common.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (err) {
      console.log(err.messsage);
    }
  };

  return (
    <div
      className={`w-full bg-[#000001] items-center lg:flex justify-center h-16 absolute top-0 z-40 shadow-[#2c2b2b] shadow-sm ${
        selectedChat.chat ? "hidden" : "flex"
      }`}
    >
      <div className="w-4/5 h-2/3 flex items-center justify-between">
        <div className="mx-0">
          <h1 className="text-3xl font-bold text-white select-none cursor-pointer">
            <Link to="/">ChatApp</Link>
          </h1>
        </div>
        <div className="Acount">
          <ul>
            <li className="relative">
              <div
                className={`profile w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer ${shadow}`}
                onClick={() => setSubMenu(!subMenu)}
              >
                <img
                  src={`http://localhost:3000/uploads/avatars/${user.avatar}`}
                  alt="Profile Picture"
                  className="h-full w-full object-cover"
                />
              </div>
              <ul
                className={`bg-white w-32 font-semibold absolute right-0 top-9 select-none rounded-md overflow-hidden shadow-lg ${showHidden}`}
              >
                <li className="border-b-2 border-solid px-2 py-1 hover:bg-[#E5E7EB]">
                  <Link to="#">View Profile</Link>
                </li>
                <li className="px-2 py-1 hover:bg-[#E5E7EB]">
                  <Link to="#" onClick={logOut}>
                    LogOut
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
