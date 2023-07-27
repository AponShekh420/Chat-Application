import axios from "axios";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineUsergroupAdd } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import { menuClose } from "../../redux/reducers/menuReducer";
import User from "../common/User";
const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Menu() {
  const { menuToggle } = useSelector((state) => state.sidebarMenu);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getUsers = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/users?search=${search}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setUsers(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const createChat = async (user) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/chat",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (data.errors) {
        toast.error(data.errors.common.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
        return;
      } else {
        dispatch(menuClose());
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div
        className={`w-screen h-screen fixed flex transition duration-700 ease-in-out z-50 justify-between bg-[#000000b6]${
          !menuToggle
            ? "opacity-0 pointer-events-none delay-700"
            : "opacity-100 pointer-events-auto delay-0"
        }`}
      >
        <div
          className={`w-full lg:w-96 h-full bg-[#ffffff] flex transition duration-700 ease-in-out flex-col items-center ${
            !menuToggle ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex justify-end w-full p-3">
            <GrClose
              size={30}
              cursor="pointer"
              onClick={() => dispatch(menuClose())}
            />
          </div>
          <div>
            <AiOutlineUsergroupAdd size={70} color="#17AEC9" />
          </div>
          <form
            action={`http://localhost:3000/api/users?search=${search}`}
            method="post"
          >
            <div className="bg-[#D9D9D9] rounded-2xl h-fit flex justify-center items-center">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Users"
                className="py-1 px-4 bg-[#D9D9D9] rounded-l-2xl focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-r-2xl px-2 py-2 bg-[#17aec9]"
                onClick={getUsers}
              >
                <AiOutlineSearch color="white" />
              </button>
            </div>
          </form>
          <div
            className={`w-full overflow-auto h-full mt-3 border-t-2 ${
              loading || users.length === 0
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
            ) : users.length > 0 ? (
              users.map((user, index) => (
                <User
                  key={Math.random() * 300 + index}
                  user={user}
                  handler={createChat}
                />
              ))
            ) : (
              <div className="w-fit h-fit">
                <h1 className="text-lg font-bold">Users Not Founded</h1>
              </div>
            )}
          </div>
        </div>
        <div
          className={`lg:w-full lg:h-full   ${
            !menuToggle ? "" : "bg-[#00000080] delay-500"
          }`}
          onClick={() => dispatch(menuClose())}
        ></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Menu;
