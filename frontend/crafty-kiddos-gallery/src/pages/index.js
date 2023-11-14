import { Card } from "@/components/card";
import { DisplayCards } from "@/components/displayCards";
import { NavBar } from "@/components/navBar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [craftList, setCraftList] = useState([]);

  const getRandomCrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/randomcrafts", {
        withCredentials: true,
      });
      console.log("response: ", response.data.random);

      const mappe = response.data.random.map((item) => {
        return {
          key: item.ID,
          content: (
            <Card
              image={
                item.Pictures && item.Pictures.length > 0
                  ? item.Pictures[0].ImageUrl
                  : "#_"
              }
              atAge={item.AtAge}
              description={item.Description}
              kidName={item.KidName}
            />
          ),
        };
      });

      setCraftList(mappe);
      console.log("fdsfsdf: ", craftList);
    } catch (error) {
      console.log("Error getting randomcrafts: ", error);
    }
  };
  useEffect(() => {
    getRandomCrafts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <DisplayCards crafts={craftList} />
    </div>
  );
}
