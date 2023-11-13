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
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      console.log("User created: ", response.data);
      const token = response.data.token;
      document.cookie = `Authorization=${token}; Max-Age=86400; Secure; SameSite=None; path=/`;
      window.location.reload();
    } catch (error) {
      console.log("Error creating user: ", error);
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
        <form onSubmit={handleFormSubmit}>
          <h3 className="text-2xl font-bold mb-4 text-center">Sign In</h3>
          <div className="text-center mb-4">
            Not registered yet?
            <span
              onClick={openSignupModal}
              className="ml-2 text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </div>
          <div className="mb-3">
            <label className="block">Email address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <button type="submit">Submit button</button>
          </div>
        </form>
      </div>
    </div>
  );
}
