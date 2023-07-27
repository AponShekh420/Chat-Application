import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext("");

export const AuthValue = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);
  return (
    <div>
      <AuthContext.Provider
        value={{ user, setUser, selectedChat, setSelectedChat }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthProvider;
