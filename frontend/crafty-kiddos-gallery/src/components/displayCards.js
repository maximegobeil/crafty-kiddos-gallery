import { useEffect, useState } from "react";
import { Card } from "./card";
import { CarouselBuilder } from "./carouselBuilder";
import { Filter } from "./filter";
import axios from "axios";

export function DisplayCards(crafts) {
  console.log("crafts", crafts);

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
  ];
  console.log("cards", cards);
*/
  return (
    <div className="bg-[#9fd8d1] flex flex-grow min-w-full">
      <div className="m-10 mx-auto w-full">
        <div className="flex flex-col justify-center items-center h-5/6">
          <CarouselBuilder
            cards={crafts.crafts}
            offset={3}
            showArrows={false}
          />
        </div>
        <div>
          <Filter />
        </div>
      </div>
    </div>
  );
}
