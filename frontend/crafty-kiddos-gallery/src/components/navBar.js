import { useState } from "react";
import { LoginModal } from "./loginModal";
import { SignupModal } from "./signupModal";

export function NavBar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };
  const openSignupModal = () => {
    setSignupModalOpen(true);
    setLoginModalOpen(false);
  };

  return (
    <nav>
      <navcontainer className="flex items-center justify-between w-full bg-[#99E0EC] drop-shadow">
        <h1 className="text-7xl text-[#377069] mt-4 mb-4 ml-16">
          Crafty <span className="text-[#c08b45]">Kiddos</span> Gallery
        </h1>
        <div className="flex space-x-4 mr-4">
          <a
            onClick={() => setLoginModalOpen(true)}
            href="#_"
            class="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#d56a36] text-[#d56a36]"
          >
            <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#d56a36] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span class="relative text-[#d56a36] transition duration-300 group-hover:text-white ease">
              Login
            </span>
          </a>
          <a
            onClick={() => setSignupModalOpen(true)}
            href="#_"
            class="text-2xl rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#d56a36] text-[#d56a36]"
          >
            <span class="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#d56a36] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
            <span class="relative text-[#d56a36] transition duration-300 group-hover:text-white ease">
              Sign Up
            </span>
          </a>
        </div>
      </navcontainer>
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
