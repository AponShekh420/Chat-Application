import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./Chat";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Home;
