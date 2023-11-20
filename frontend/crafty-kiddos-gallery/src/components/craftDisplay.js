import axios from "axios";
import { useEffect, useState } from "react";
import { CraftEditModal } from "./craftEditModal";

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
        `http://localhost:3000/kids/${kidID}/crafts`,
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
        `http://localhost:3000/kids/${kidID}/crafts/${craftID}/pictures`,
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
      // Clear form field
      setDescription("");
      setImage(null);
      setIsPrivate(false);
    } catch (error) {
      console.log("Error creating craft: ", error);
    }
  };

  const getCrafts = async () => {
    try {
      const craftsResponse = await axios.get(
        `http://localhost:3000/kids/${kidID}/crafts`,
        { withCredentials: true }
      );
      console.log("Crafts: ", craftsResponse.data);
      const craftsWithPictures = craftsResponse.data.crafts.map(
        async (craft) => {
          const picturesResponse = await axios.get(
            `http://localhost:3000/kids/${kidID}/crafts/${craft.ID}/pictures`,
            { withCredentials: true }
          );
          return {
            ...craft,
            pictures: picturesResponse.data.pictures,
          };
        }
      );

      Promise.all(craftsWithPictures).then((craftsWithPictures) => {
        setCrafts(craftsWithPictures);
      });
    } catch (error) {
      console.log("Error getting crafts: ", error);
    }
  };

  useEffect(() => {
    // Call getCrafts directly here
    getCrafts();
  }, [kidID]);

  const deleteCraft = async (craftID) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/kids/${kidID}/crafts/${craftID}`,
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
    console.log("Craft selected: ", selectedCraft);
  };

  return (
    <div className="col-span-4 bg-gray-100">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4">Crafts of {kidName}</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="block">Description</label>
          <input
            type="text"
            className="border-2 border-gray-400 rounded-md mb-4"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label onClick={handleImageChange} className="block">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="border-2 border-gray-400 rounded-md mb-4"
            onChange={handleImageChange}
          />
          <label className="block">Private</label>
          <input
            type="checkbox"
            className="border-2 border-gray-400 rounded-md mb-4"
            checked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
          />
          <button
            onClick={createCraftAndPicture}
            className="bg-blue-500 text-white rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-blue-500"
          >
            Create Craft
          </button>
        </form>
        <div className="flex flex-wrap justify-center">
          {crafts.map((craft) => {
            return (
              <div
                key={craft.ID}
                className="flex flex-col justify-center items-center m-4"
              >
                <img
                  className="w-64 h-64 object-cover rounded-md"
                  src={
                    craft.pictures && craft.pictures.length > 0
                      ? craft.pictures[0].ImageUrl
                      : ""
                  }
                  alt={craft.AtAge}
                />
                <p className="text-lg">{craft.Description}</p>
                <p className="text-lg">{craft.AtAge}</p>
                <button onClick={() => handleModify(craft)}>Modify</button>
                <button onClick={() => deleteCraft(craft.ID)}>Delete</button>
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