import axios from "axios";
import { useEffect, useState } from "react";

export function KidEditModal({ open, onClose, kidName, kidAge, kidID }) {
  const [name, setKidName] = useState(kidName);
  const [age, setKidAge] = useState(kidAge);

  useEffect(() => {
    setKidName(kidName);
    setKidAge(kidAge);
  }, [kidName, kidAge]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onClose();
    try {
      const response = await axios.put(
        `https://crafty-kiddos-gallery-api.onrender.com/kids/${kidID}`,
        {
          name: name,
          age: Number(age),
        },
        { withCredentials: true }
      );
      console.log("Kid updated: ", response.data);
      window.location.reload();
    } catch (error) {
      console.log("Error updating kid: ", error);
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
          <h3 className="text-2xl font-bold mb-4 text-center">
            Edit {kidName}
          </h3>

          <div className="mb-3">
            <label className="block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setKidName(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="block">Age</label>
            <input
              type="number"
              value={age}
              onChange={(event) => setKidAge(event.target.value)}
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
