export function SignupModal({ open, onClose, openLoginModal }) {
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
        <form>
          <h3 className="text-2xl font-bold mb-4 text-center">Sign Up</h3>
          <div className="text-center mb-4">
            Already registered?
            <span
              onClick={openLoginModal}
              className="ml-2 text-blue-500 cursor-pointer"
            >
              Sign In
            </span>
          </div>
          <div className="mb-3">
            <label className="block">Name</label>
            <input type="text" placeholder="Enter name" />
          </div>
          <div className="mb-3">
            <label className="block">Email address</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="block">Password</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <div>
            <a
              href="#_"
              className="w-full inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-[#d56a36] border-[#d56a36] rounded-md shadow-sm hover:bg-[#d56a36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d56a36]"
              data-rounded="rounded-md"
              data-primary="blue-600"
              data-primary-reset="{}"
            >
              Submit
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
