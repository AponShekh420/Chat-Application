/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { ToastContainer, toast } from "react-toastify";

const CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setData(data);
      if (data.message) {
        setLoading(false);
        setEmail("");
        setPassword("");
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        setTimeout(() => {
          navigate("/", {
            replace: true,
          });
        }, 2000);
      }
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-full h-screen lg:w-96 lg:h-auto bg-slate-500 p-4 md:rounded-lg text-center">
        <h1 className="text-3xl font-bold text-white">Login Account</h1>
        <hr className="my-2" />
        <form
          action="http://localhost:3000/api/users/login"
          onSubmit={loginUser}
          method="post"
        >
          <div className="flex flex-col justify-start mb-4">
            <label
              htmlFor="email"
              name="email"
              className="text-left font-semibold text-white "
            >
              Email:
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email"
              className=" p-2 rounded-md border-2 border-solid border-red-300 focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="flex flex-col justify-start mb-4">
            <label
              htmlFor="password"
              name="password"
              className="text-left font-semibold text-white"
            >
              Password:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              className=" p-2 rounded-md border-2 border-solid border-red-300 focus:outline-none focus:border-black"
            />
          </div>
          <p className="text-lg text-red-700 text-center lg:text-sm">
            {data.errors?.login?.msg || null}
          </p>

          <button
            className="mb-4 py-2 px-6 w-full text-white font-semibold text-xl pb-3 bg-green-600 rounded-md shadow-md shadow-black-100"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircleLoader
                color="#ffffff"
                loading={loading}
                cssOverride={CSSProperties}
                size={28}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <h1 className="font-semibold text-md text-white">
          If you haven't an account please{" "}
          <Link to="/signup" className="text-blue-700">
            Sing Up
          </Link>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
