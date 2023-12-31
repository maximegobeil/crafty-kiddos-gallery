import axios from "axios";
import { useEffect, useState } from "react";
import { CraftEditModal } from "./craftEditModal";
import Image from "next/image";

export function CraftDisplay({ kidID, kidName, kidAge }) {
  const [crafts, setCrafts] = useState([]);
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const createCraftAndPicture = async () => {
    try {
      // Step 1 - Create the craft
      const response = await axios.post(
        `https://api.maxgobeil.dev/kids/${kidID}/crafts`,
        {
          kidName: kidName,
          atAge: kidAge,
          description: description,
          isPrivate: isPrivate,
        },
        { withCredentials: true }
      );
      const craftID = response.data.craft.ID;
      // Step 2 - Create the image
      const formData = new FormData();
      formData.append("image", image);
      const pictureResponse = await axios.post(
        `https://api.maxgobeil.dev/kids/${kidID}/crafts/${craftID}/pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Picture created: ", pictureResponse.data);
      setCrafts((prevCrafts) => [...prevCrafts, response.data.craft]);
      // Clear the form field
      setDescription("");
      setImage(null);
      setIsPrivate(false);
    } catch (error) {
      console.log("Error creating craft: ", error);
    }
  };

  const getCrafts = async () => {
    try {
      const response = await axios.get(
        `https://api.maxgobeil.dev/kids/${kidID}/crafts`,
        { withCredentials: true }
      );
      console.log("Crafts: ", response.data);

      const mappe = response.data.crafts.map((item) => {
        return {
          ...item,
          pictures: response.data.pictures,
        };
      });
      setCrafts(mappe);
    } catch (error) {
      console.log("Error getting crafts: ", error);
    }
  };

  useEffect(() => {
    getCrafts();
  }, [kidID]);

  const deleteCraft = async (craftID) => {
    try {
      const response = await axios.delete(
        `https://api.maxgobeil.dev/kids/${kidID}/crafts/${craftID}`,
        { withCredentials: true }
      );
      console.log("Craft deleted: ", response.data);
      setCrafts((prevCrafts) =>
        prevCrafts.filter((craft) => craft.ID !== craftID)
      );
    } catch (error) {
      console.log("Error deleting craft: ", error);
    }
  };

  const handleModify = (craft) => {
    setSelectedCraft(craft);
    setOpen(true);
  };

  return (
    <div className="col-span-4 bg-gray-100">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-gray-500 font-bold mb-4 mt-6">
          Crafts of: {kidName}
        </h2>
        <form
          name="craftCreationForm"
          onSubmit={(event) => event.preventDefault()}
          className="bg-white p-4 rounded-md shadow-md"
        >
          <div className="text-center text-lg font-medium text-gray-500">
            Craft Creation Form
          </div>
          <label className="block text-gray-500 my-1">Description</label>
          <input
            type="text"
            className="border-2 border-gray-400 rounded-md mb-4 px-2 py-1"
            placeholder="Craft description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label
            onClick={handleImageChange}
            className="block text-gray-500 my-1"
          >
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="border-2 border-gray-400 rounded-md mb-4 px-2 py-1 text-[#979797]"
            onChange={handleImageChange}
          />
          <div>
            <input
              type="checkbox"
              className="border-2 border-gray-400 rounded-md mb-4"
              checked={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
            />
            <label className="ml-2 text-gray-500">
              Private (Check to hide from other users)
            </label>
          </div>

          <button
            onClick={createCraftAndPicture}
            className="text-white font-semibold bg-[#9fd8d1] px-3 py-1.5 rounded-md grow hover:bg-[#7fc5bf] content-center w-full"
          >
            Create Craft
          </button>
        </form>
        <div className="grid grid-cols-3 gap-6 m-6">
          {crafts.map((craft) => {
            return (
              <div
                key={craft.ID}
                className=" bg-white rounded-md drop-shadow-md"
              >
                <Image
                  className="object-cover rounded-md m-auto p-3"
                  width={400}
                  height={400}
                  src={
                    craft.Pictures && craft.Pictures.length > 0
                      ? craft.Pictures[0].ImageUrl
                      : ""
                  }
                  alt={craft.AtAge}
                />
                <p className="text-lg mt-4 p-2">
                  Description: {craft.Description}
                </p>
                <p className="text-lg p-2">At Age: {craft.AtAge}</p>
                <div className="flex justify-around mb-4 mt-2 text-white font-medium">
                  <button
                    className="bg-[#d56a36] px-8 py-1 rounded-md"
                    onClick={() => handleModify(craft)}
                  >
                    Modify
                  </button>
                  <button
                    className="bg-[#d56a36] px-8 py-1 rounded-md"
                    onClick={() => deleteCraft(craft.ID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CraftEditModal
        open={open}
        onClose={() => setOpen(false)}
        craft={selectedCraft}
        kidID={kidID}
        refresh={() => getCrafts()}
      />
    </div>
  );
}
