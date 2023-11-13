import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";

import { useState } from "react";

export function Filter() {
  const ageGroup = [
    { group: "1-4 Tiny Tots", icon: "🍼" },
    { group: "5-9 Little Explorers", icon: "🌍" },
    { group: "10-12 Junior Adventurer", icon: "🚀" },
    { group: "13-15 Teen Trailblazers ", icon: "🦸" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex place-content-center">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" bg-blue-400 flex felx-col justify-between rounded-md p-4 mx-4 w-1/6 border-4 border-transparent active:border-white duration-300 active:text-white"
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
      <button className="bg-blue-400 rounded-md p-4 mx-4">Most Liked</button>
      <button className="bg-blue-400 rounded-md p-4 mx-4">Generate More</button>
    </div>
  );
}
