import dynamic from "next/dynamic";
import { config } from "react-spring";
import { useState, useEffect } from "react";

const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Set ssr to false to prevent server-side rendering
});

export function CarouselBuilder(props) {
  const cardsInfo = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(cardsInfo);
  const [showArrows, setShowArrows] = useState(false);
  const [index, setIndex] = useState(4);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div className="w-[90%]">
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
