import { Card } from "./card";
import { CarouselBuilder } from "./carouselBuilder";
import uuidv4 from "uuid";

export function DisplayCards() {
  let cards = [
    {
      key: 15,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 17,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 3,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 4,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 5,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 6,
      content: <Card image="https://picsum.photos/600/800/?random" />,
    },
    {
      key: 7,
      content: <Card image="https://picsum.photos/600/800/?random" alt="4" />,
    },
    {
      key: 8,
      content: <Card image="https://picsum.photos/600/800/?random" alt="4" />,
    },
  ];

  return (
    <div className="bg-[#d2a098] flex flex-grow min-w-full">
      <div className="m-10 mx-auto w-full">
        <div className="flex justify-center items-center mt-8 h-2/3">
          <CarouselBuilder cards={cards} offset={3} showArrows={false} />
        </div>
      </div>
    </div>
  );
}
