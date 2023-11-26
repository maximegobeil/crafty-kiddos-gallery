import { useEffect, useState } from "react";
import { LoginModal } from "./loginModal";
import { SignupModal } from "./signupModal";
import axios from "axios";
import Link from "next/link";

export function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:3000/validate", {
          withCredentials: true,
        });
        console.log("User authenticated: ");
        setIsLoggedIn(true);
      } catch (error) {
        console.log("User not authenticated: ", error);
      }
    };
    checkAuthentication();
  }, []);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };
  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false);
  };
  const handleLogout = () => {
    document.cookie = `Authorization=; Max-Age=-1; path=/; domain:https://localhost:3000; SameSite=None; Secure`;
    window.location.reload();
  };

  return (
    <nav>
      <div className="flex items-center justify-between w-full bg-[#fff] drop-shadow">
        <Link href="/">
          <h1 className="text-7xl text-[#d56a36] mt-4 mb-4 ml-16 drop-shadow-md">
            Crafty <span className="text-[#9fd8d1]">Kiddos</span> Gallery
          </h1>
        </Link>
        {!isLoggedIn ? (
          <div className="flex space-x-4 mr-4">
            <Link
              onClick={() => setLoginModalOpen(true)}
              href="#_"
              className="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 border-[#9fd8d1] font-medium bg-[#9fd8d1]"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-[#fff] transition duration-300  group-hover:text-[#9fd8d1] ease ">
                Login
              </span>
            </Link>
            <Link
              onClick={() => setSignupModalOpen(true)}
              href="#_"
              className="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#9fd8d1] bg-[#9fd8d1]"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-[#fff] transition duration-300 group-hover:text-[#9fd8d1] ease">
                Sign Up
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4 mr-4">
            <Link
              href="/kids"
              className="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 border-[#9fd8d1] font-medium bg-[#9fd8d1]"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-[#fff] transition duration-300 group-hover:text-[#9fd8d1] ease">
                My Kids
              </span>
            </Link>
            <Link
              href="/"
              onClick={handleLogout}
              className="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 border-[#9fd8d1] font-medium bg-[#9fd8d1]"
            >
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-[#fff] transition duration-300 group-hover:text-[#9fd8d1] ease">
                Logout
              </span>
            </Link>
          </div>
        )}
      </div>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        openSignupModal={openSignupModal}
      />
      <SignupModal
        open={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        openLoginModal={openLoginModal}
      />
    </nav>
  );
}
