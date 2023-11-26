import { useState } from "react";
import { useSpring, animated } from "react-spring";

export function Card({ image, atAge, description, kidName }) {
  const [show, setShown] = useState(false);

  const props3 = useSpring({
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)",
  });

  return (
    <animated.div
      className="flex flex-col justify-center bg-[#e1e0dc] w-80 rounded-md pr-8 pb-2 pl-8 "
      style={props3}
      onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Image className="rounded-md -mt-6" src={image} alt="" />
      <p className="mt-6 text-[#6e6d6d]">{description}</p>
      <div className="flex justify-between items-center mt-4 pb-1">
        <h3 className="text-lg text-[#6e6d6d]">By: &nbsp;{kidName}</h3>
        <h3 className="text-lg text-[#6e6d6d]">Age: &nbsp;{atAge}</h3>
      </div>
    </animated.div>
  );
}
