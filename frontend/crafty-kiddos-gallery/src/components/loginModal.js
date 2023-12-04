import axios from "axios";
import { useState } from "react";

export function LoginModal({ open, onClose, openSignupModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onClose();

    try {
      console.log("email: ", email);
      const response = await axios.post(
        "https://crafty-kiddos-gallery-api.onrender.com/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("User logged in: ");
      const token = response.data.token;
      document.cookie = `Authorization=${token}; max-age=86400; path=/; samesite=none`;
      console.log("Cookie set: ", document.cookie);
      //window.location.reload();
    } catch (error) {
      console.log("Error trying to login: ", error);
    }
  };

  return (
    <div
      onClick={onClose}
      className={`z-50 fixed inset-0 flex justify-center 
      items-center transition-colors 
      ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={`
        bg-white rounded-md shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md text-gra-400 bg-white hover:bg-gray-100 hover:text-gray-600"
        >
          X
        </button>
        <form name="login" onSubmit={handleFormSubmit}>
          <h3 className="text-2xl font-bold mb-4 text-center text-[#2f2f2f]">
            Sign In
          </h3>
          <div className="text-center mb-4 text-[#2f2f2f]">
            Not registered yet?
            <span
              onClick={openSignupModal}
              className="ml-2 text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </div>
          <div className="mb-4 mt-8">
            <label className="block text-[#2f2f2f]">Email address:</label>
            <input
              className="bg-gray-100 rounded-md p-2 mt-1"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-[#2f2f2f]">Password:</label>
            <input
              className="bg-gray-100 rounded-md p-2 mt-1"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="text-white font-semibold bg-[#9fd8d1] px-3 py-1.5 rounded-md grow hover:bg-[#7fc5bf]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
