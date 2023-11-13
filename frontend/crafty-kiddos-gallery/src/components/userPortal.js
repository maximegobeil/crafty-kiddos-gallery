import axios from "axios";
import { useEffect, useState } from "react";
import { CraftDisplay } from "./craftDisplay";
import { KidEditModal } from "./kidEditModal";

export function UserPortal() {
  const [kidName, setKidName] = useState("");
  const [kidAge, setKidAge] = useState(0);
  const [KidEditModalOpen, setKidEditModalOpen] = useState(false);
  const [selectedKidID, setSelectedKidID] = useState(null);
  const [selectedKidName, setSelectedKidName] = useState("");
  const [selectedKidAge, setSelectedKidAge] = useState(0);

  const createKid = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/kids",
        {
          name: kidName,
          age: Number(kidAge),
        },
        { withCredentials: true }
      );
      console.log("Kid created: ", response.data);
      getAllKids();
    } catch (error) {
      console.log("Error creating kid: ", error);
    }
  };
  //get the kids from the database for this user

  const [kids, setKids] = useState([]);
  const getAllKids = async () => {
    try {
      const response = await axios.get("http://localhost:3000/kids", {
        withCredentials: true,
      });
      setKids(response.data.kids.map((kid) => ({ ...kid, isSelected: false })));
      console.log("User Kids: ", response.data.kids);
    } catch (error) {
      console.log("Error getting kids: ", error);
    }
  };
  useEffect(() => {
    getAllKids();
  }, []);

  const selectKid = (kidID) => {
    // Find the selected kid
    const selectedKid = kids.find((kid) => kid.ID === kidID);

    // Update state variables with selected kid's information
    setSelectedKidID(selectedKid.ID);
    setSelectedKidName(selectedKid.Name);
    setSelectedKidAge(selectedKid.Age);

    // Update isSelected in the state
    setKids((prevKids) =>
      prevKids.map((kid) =>
        kid.ID === kidID
          ? { ...kid, isSelected: true }
          : { ...kid, isSelected: false }
      )
    );
  };

  const deleteKid = async (kidID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/kids/${kidID}`,
        { withCredentials: true }
      );
      console.log("Kid deleted: ", response.data);
      getAllKids();
    } catch (error) {
      console.log("Error deleting kid: ", error);
    }
  };

  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1 bg-gray-200">
        <div className="flex flex-col justify-center items-center">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              createKid();
            }}
            className="flex flex-col justify-center items-center"
          >
            <label className="text-2xl">Create a Kid</label>
            <div className="flex flex-col justify-center items-center">
              <label className="text-xl">Name</label>
              <input
                className="border-2 border-gray-300 rounded-md"
                type="text"
                placeholder="Enter name"
                value={kidName}
                onChange={(event) => setKidName(event.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label className="text-xl">Age</label>
              <input
                className="border-2 border-gray-300 rounded-md"
                type="number"
                placeholder="Enter age"
                value={kidAge}
                onChange={(event) => setKidAge(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border-2 border-gray-300 rounded-md"
            >
              Create Kid
            </button>
          </form>
          <div className="mt-10">my kid list from database</div>
          <h2 className="text-xl font-bold mb-4">My Kid List</h2>
          <ul>
            {kids.map((kid) => (
              <li key={kid.ID} onClick={() => selectKid(kid.ID)}>
                {kid.Name}, Age: {kid.Age}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    selectKid(kid.ID);
                    setKidEditModalOpen(true);
                  }}
                  className="ml-4"
                >
                  Modify
                </button>
                <button onClick={() => deleteKid(kid.ID)} className="ml-4">
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-4 bg-gray-300">
        {kids.find((kid) => kid.isSelected) && (
          <CraftDisplay
            kidID={kids.find((kid) => kid.isSelected).ID}
            kidName={kids.find((kid) => kid.isSelected).Name}
            kidAge={kids.find((kid) => kid.isSelected).Age}
          />
        )}
      </div>
      <KidEditModal
        open={KidEditModalOpen}
        onClose={() => setKidEditModalOpen(false)}
        kidName={selectedKidName}
        kidAge={selectedKidAge}
        kidID={selectedKidID}
      />
    </div>
  );
}
