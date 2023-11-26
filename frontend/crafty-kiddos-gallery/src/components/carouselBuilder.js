import dynamic from "next/dynamic";
import { config } from "react-spring";
import React, { useState, useEffect } from "react";

const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
  loading: () => <p className="text-center">Loading...</p>,
  ssr: false, // Set ssr to false to prevent server-side rendering
});

export function CarouselBuilder(props) {
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [goToSlide, setGoToSlide] = useState(null);
  const [showArrows, setShowArrows] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
    setCards(
      Array.isArray(props.cards)
        ? props.cards.map((element, index) => ({
            ...element,
            onClick: () => setGoToSlide(index),
          }))
        : []
    );
  }, [props.offset, props.showArrows, props.cards]);

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
