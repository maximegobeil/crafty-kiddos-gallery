import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FaHeart } from "react-icons/fa";

export function Card({ image }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <animated.div
      className="flex flex-col justify-center bg-orange-100 w-80 rounded-md pr-8 pb-2 pl-8"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img className="rounded-md -mt-6" src={image} alt="" />
      <p className="mt-6">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh
      </p>
      <div className="flex justify-between items-center mt-6">
        <h3>By: Nathan</h3>
        <h3>Age: 6</h3>
        <div style={{ color: "green" }}>
          <FaHeart />
        </div>
      </div>
    </animated.div>
  );
}
