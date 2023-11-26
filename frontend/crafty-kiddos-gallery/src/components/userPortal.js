import axios from "axios";
import { useEffect, useState } from "react";
import { CraftDisplay } from "./craftDisplay";
import { KidEditModal } from "./kidEditModal";

export function UserPortal() {
  const [kidName, setKidName] = useState("");
  const [kidAge, setKidAge] = useState("");
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
      setKidAge("");
      setKidName("");
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
      <div className="col-span-1 bg-[#a1bec6]">
        <div className="flex flex-col justify-center items-center">
          <form
            name="createKid"
            onSubmit={(event) => {
              event.preventDefault();
              createKid();
            }}
            className="flex flex-col justify-center items-center"
          >
            <label className="text-2xl mt-3 text-white">Create a Kid</label>

            <div className="flex flex-col items-center mx-2 mt-3">
              <label className="text-xl p-2 self-start ml-1 text-white">
                Name:
              </label>
              <input
                className="border-2 border-gray-300 rounded-md w-11/12 place-content-center pl-2 py-1"
                type="text"
                placeholder="Enter kid name"
                value={kidName}
                onChange={(event) => setKidName(event.target.value)}
              />

              <label className="text-xl p-2 self-start ml-1 text-white">
                Age:
              </label>
              <input
                className="border-2 border-gray-300 rounded-md w-11/12 place-content-center pl-2 py-1"
                type="number"
                placeholder="Enter age"
                value={kidAge}
                onChange={(event) => setKidAge(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="border-2 border-gray-400 rounded-md m-4 px-3 py-0.5 text-white text-lg"
            >
              Create
            </button>
          </form>
          <h2 className="text-xl font-bold my-3 text-white">My Kid List</h2>
          <ul className="w-full">
            {kids.map((kid) => (
              <li
                className={
                  kid.ID == selectedKidID
                    ? "mx-3 my-2 py-2 px-3 rounded-md bg-[#6D93A0] drop-shadow-lg text-white border-4"
                    : "mx-4 my-3 py-2 px-3 rounded-md bg-[#6D93A0] drop-shadow-md text-white"
                }
                key={kid.ID}
                onClick={() => selectKid(kid.ID)}
              >
                <p>
                  <span className="font-medium">Name: &nbsp;</span> {kid.Name}
                </p>
                <p>
                  <span className="font-medium">Age: &nbsp;</span> {kid.Age}
                </p>
                <div className="flex flex-row justify-around mt-3">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      selectKid(kid.ID);
                      setKidEditModalOpen(true);
                    }}
                    className="bg-[#a1bec6] px-4 py-0.5 rounded-md font-medium hover:bg-[#96bec9]"
                  >
                    Modify
                  </button>
                  <button
                    onClick={() => deleteKid(kid.ID)}
                    className="bg-[#a1bec6] px-4 py-0.5 rounded-md font-medium hover:bg-[#96bec9]"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-4 bg-gray-100">
        {kids.find((kid) => kid.isSelected) ? (
          <CraftDisplay
            kidID={kids.find((kid) => kid.isSelected).ID}
            kidName={kids.find((kid) => kid.isSelected).Name}
            kidAge={kids.find((kid) => kid.isSelected).Age}
          />
        ) : (
          <div className="text-center p-4">
            <p className="text-gray-500">
              Please select a kid to display information.
            </p>
          </div>
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
