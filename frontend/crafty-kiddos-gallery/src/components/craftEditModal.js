import axios from "axios";
import { useEffect, useState } from "react";

export function CraftEditModal({ open, onClose, kidID, craft, refresh }) {
  const [description, setDescription] = useState(craft.Description);
  const [atAge, setAtAge] = useState(craft.AtAge);
  const [isPrivate, setIsPrivate] = useState(craft.IsPrivate);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onClose();
    try {
      const response = await axios.put(
        `https://crafty-kiddos-gallery-api.onrender.com/kids/${kidID}/crafts/${craft.ID}`,
        {
          description: description,
          atAge: Number(atAge),
          isPrivate: isPrivate,
        },
        { withCredentials: true }
      );
      console.log("Craft updated: ", response.data);
      refresh();
    } catch (error) {
      console.log("Error updating craft: ", error);
    }
  };

  useEffect(() => {
    setDescription(craft.Description);
    setAtAge(craft.AtAge);
    setIsPrivate(craft.IsPrivate);
  }, [craft]);

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
          bg-white rounded-md shadow p-6 transition-all w-1/4
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-md text-gra-400 bg-white hover:bg-gray-100 hover:text-gray-600"
        >
          X
        </button>
        <form className="w-full">
          <h3 className="text-2xl font-bold mb-4 text-center text-[#2f2f2f]">
            Edit Craft {craft.kidName}
          </h3>

          <div className="mb-4 mt-8">
            <label className="block text-[#2f2f2f]">Description</label>
            <textarea
              className="bg-gray-100 rounded-md p-2 mt-1 w-full"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block text-[#2f2f2f]">Made at age:</label>
            <input
              className="bg-gray-100 rounded-md p-2 mt-1 w-full"
              type="number"
              value={atAge}
              onChange={(event) => setAtAge(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
            />
            <label className="ml-2">Private</label>
          </div>
          <div>
            <button
              className="text-white font-semibold bg-[#9fd8d1] px-3 py-1.5 rounded-md w-full hover:bg-[#7fc5bf]"
              type="submit"
              onClick={handleFormSubmit}
            >
              Submit button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
