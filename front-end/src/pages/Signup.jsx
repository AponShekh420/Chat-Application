import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [compirePassword, setCompirePassword] = useState("");
  const navigate = useNavigate();
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const addUserData = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (confirmpassword === password) {
      try {
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.REACT_APP_SITE_URL}api/users/signup`,
          formData,
          config
        );
        setLoading(false);
        setData(data);
        if (data.message) {
          setName("");
          setEmail("");
          setPassword("");
          setChecked(false);
          setCompirePassword("");
          setConfirmpassword("");
          toast.success(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
          setTimeout(() => {
            navigate("/login", {
              replace: true,
            });
          }, 2000);
        }
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
    } else {
      setCompirePassword("please give same confirm password as password field");
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
      <div className="Signup-box w-full h-screen lg:w-96 lg:h-auto bg-slate-500 p-4 md:rounded-lg text-center">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <hr className="my-2" />
        <form
          action={`${process.env.REACT_APP_SITE_URL}/api/users/signup`}
          method="post"
          encType="multipart/form-data"
          onSubmit={addUserData}
        >
          <div className="flex flex-col justify-start mb-4">
            <label
              htmlFor="name"
              name="name"
              className="text-left font-semibold text-white"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your FullName"
              className=" p-2 rounded-md border-2 border-solid border-red-300 focus:outline-none focus:border-black"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <p className="text-lg text-red-700 text-left lg:text-sm">
              {data.errors?.name?.msg || null}
            </p>
          </div>
          <div className="flex flex-col justify-start mb-4">
            <label
              htmlFor="email"
              name="email"
              className="text-left font-semibold text-white"
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
            <p className="text-lg text-red-700 text-left lg:text-sm">
              {data.errors?.email?.msg || null}
            </p>
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
            <p className="text-lg text-red-700 text-left lg:text-sm">
              {data.errors?.password?.msg || null}
            </p>
          </div>
          <div className="flex flex-col justify-start mb-4">
            <label
              htmlFor="confirmpassword"
              name="confirmpassword"
              className="text-left font-semibold text-white "
            >
              Confirm Password:
            </label>
            <input
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              placeholder="Enter Your Confirm Password"
              className=" p-2 rounded-md border-2 border-solid border-red-300 focus:outline-none focus:border-black"
              required
              onChange={(e) => setConfirmpassword(e.target.value)}
              value={confirmpassword}
            />
            <p className="text-lg text-red-700 text-left lg:text-sm">
              {compirePassword || null}
            </p>
          </div>
          <div className="flex mb-4">
            <input type="file" name="profile" id="profile" />
          </div>
          <div className="flex gap-2 mb-4 items-center">
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <p className="text-white text-lg">
              {" "}
              I agree to the Terms and Conditions
            </p>
          </div>
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
              "Sign Up"
            )}
          </button>
        </form>

        <h1 className="font-semibold text-md text-white">
          You already have an account please{" "}
          <Link to="/login" className="text-blue-700">
            Login
          </Link>
        </h1>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
