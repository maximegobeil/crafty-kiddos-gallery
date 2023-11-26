import { useEffect, useState } from "react";
import { Card } from "./card";
import { CarouselBuilder } from "./carouselBuilder";
import axios from "axios";

export function DisplayCards() {
  const [craftList, setCraftList] = useState([]);
  const [isDummyData, setIsDummyData] = useState(false);
  const myurl =
    "https://pyxis.nymag.com/v1/imgs/24c/d4a/6fdd64a7c835b8325065b72e6fbfe59fb9-09-family-drawing1.rsocial.w1200.jpg";
  let card = [
    {
      key: 15,
      content: <Card image={myurl} />,
    },
    {
      key: 17,
      content: (
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRupJ3d94vlznGp2AtXKanrLsKuiprd-VEMsw&usqp=CAU" />
      ),
    },
    {
      key: 3,
      content: (
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjHuv8RuX6bf3WXE63jnTjGJUkGXCQvyZjZQ&usqp=CAU" />
      ),
    },
    {
      key: 4,
      content: (
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ3c1xUloeO5e4UupFuCalFX9unUAGPW0xDg&usqp=CAU" />
      ),
    },
    {
      key: 5,
      content: (
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF3qhjBldWjUqx4J4XKWi0YHr4qmtLp0_wCQ&usqp=CAU" />
      ),
    },
    {
      key: 6,
      content: (
        <Card image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIhV1iJ7R_-F-uuazqz9RVRUUnkYsGyiNBbQ&usqp=CAU" />
      ),
    },
    {
      key: 7,
      content: (
        <Card
          image="https://artprojectsforkids.org/wp-content/uploads/2021/12/How-to-Draw-a-Minion.jpg.webp"
          alt="4"
        />
      ),
    },
    {
      key: 8,
      content: (
        <Card
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3kMQUgzAZ9LNl77hFhOOm1jSYBwD8GRoFCw&usqp=CAU"
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
