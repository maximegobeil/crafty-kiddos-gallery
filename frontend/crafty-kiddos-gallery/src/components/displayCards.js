import { useCallback, useEffect, useState } from "react";
import { Card } from "./card";
import { CarouselBuilder } from "./carouselBuilder";
import axios from "axios";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

export function DisplayCards() {
  const [craftList, setCraftList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ageGroup = [
    { group: "0-4 Tiny Tots", icon: "🍼" },
    { group: "5-9 Little Explorers", icon: "🌍" },
    { group: "10-12 Junior Adventurer", icon: "🚀" },
    { group: "13-15 Teen Trailblazers ", icon: "🦸" },
  ];
  /*const myurl =
    "https://pyxis.nymag.com/v1/imgs/24c/d4a/6fdd64a7c835b8325065b72e6fbfe59fb9-09-family-drawing1.rsocial.w1200.jpg";
  let cards = [
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
  ];*/

  const getRandomCrafts = useCallback(async () => {
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
    } catch (error) {
      console.log("Error getting randomcrafts: ", error);
    }
  });
  useEffect(() => {
    getRandomCrafts();
  }, []);

  return (
    <div className="bg-[#9fd8d1] flex flex-grow min-w-full">
      <div className="m-10 mx-auto w-full">
        <div className="flex flex-col justify-center items-center h-5/6">
          <CarouselBuilder cards={craftList} offset={3} showArrows={false} />
        </div>
        <div>
          <div className="relative flex place-content-center">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className=" bg-blue-400 flex felx-col justify-between rounded-md p-4 mx-4 w-1/6
               border-4 border-transparent active:border-white duration-300 active:text-white"
            >
              Age Group
              {!isOpen ? <AiOutlineCaretDown /> : <AiOutlineCaretUp />}
            </button>
            {isOpen && (
              <div className="bg-white absolute bottom-10 z-40">
                {ageGroup.map((item, index) => (
                  <div key={index} className="flex place-content-between p-2">
                    <h3>{item.group}</h3>
                    <h3>{item.icon}</h3>
                  </div>
                ))}
              </div>
            )}
            <button className="bg-blue-400 rounded-md p-4 mx-4 w-1/8">
              Generate New Crafts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
