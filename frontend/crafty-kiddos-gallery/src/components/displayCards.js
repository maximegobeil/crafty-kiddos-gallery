import { useEffect, useState } from "react";
import { Card } from "./card";
import { CarouselBuilder } from "./carouselBuilder";
import axios from "axios";

export function DisplayCards() {
  const [craftList, setCraftList] = useState([]);
  const [isDummyData, setIsDummyData] = useState(false);
  const card = [
    {
      key: 15,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy1.png" />
      ),
    },
    {
      key: 17,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy2.png" />
      ),
    },
    {
      key: 3,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy3.png" />
      ),
    },
    {
      key: 4,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy4.png" />
      ),
    },
    {
      key: 5,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy5.png" />
      ),
    },
    {
      key: 6,
      content: (
        <Card image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy6.png" />
      ),
    },
    {
      key: 7,
      content: (
        <Card
          image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy7.png"
          alt="4"
        />
      ),
    },
    {
      key: 8,
      content: (
        <Card
          image="https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/dummy8.png"
          alt="4"
        />
      ),
    },
  ];

  const getRandomCrafts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/randomcrafts", {
        withCredentials: true,
      });

      const mappe = response.data.random.map((item) => {
        return {
          key: item.ID,
          content: (
            <Card
              image={
                item.Pictures && item.Pictures.length > 0
                  ? item.Pictures[0].ImageUrl
                  : "https://crafty-kiddos-gallery.s3.us-east-2.amazonaws.com/placeholderimg.png"
              }
              atAge={item.AtAge}
              description={item.Description}
              kidName={item.KidName}
            />
          ),
        };
      });
      setCraftList(mappe);
      setIsDummyData(false);
    } catch (error) {
      console.log("Error getting randomcrafts: ", error);
      setCraftList(card);
      setIsDummyData(true);
    }
  };
  useEffect(() => {
    getRandomCrafts();
  }, []);

  return (
    <div className="bg-[#a1bec6] flex flex-grow min-w-full">
      <div className="m-10 mx-auto w-full">
        <div>
          {isDummyData && (
            <h4 className="text-center text-xl mt-2">
              ---&gt; &nbsp;&nbsp;&nbsp;&nbsp;Connection to database error this
              is some Dummy Data&nbsp;&nbsp;&nbsp;&nbsp; &lt;---
            </h4>
          )}
        </div>
        <div className="flex flex-col justify-center items-center h-5/6">
          <CarouselBuilder cards={craftList} offset={3} showArrows={false} />
        </div>
      </div>
    </div>
  );
}
