import { useState } from "react";
import { useSpring, animated } from "react-spring";

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
      className="flex flex-col justify-center bg-orange-100 w-64 h-fit rounded-md pr-8 pb-8 pl-8"
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <img className="rounded-md -mt-8" src={image} alt="" />
      <h2>Title</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh
      </p>
      <div className="flex justify-between items-center">
        <button>Code</button>
        <button>text</button>
      </div>
    </animated.div>
  );
}
