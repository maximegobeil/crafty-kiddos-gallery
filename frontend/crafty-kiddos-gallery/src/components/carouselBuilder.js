import dynamic from "next/dynamic";
import { config } from "react-spring";
import React, { useState, useEffect } from "react";

const Carousel = dynamic(() => import("react-spring-3d-carousel"), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Set ssr to false to prevent server-side rendering
});

export function CarouselBuilder(props) {
  const cardsInfo = Array.isArray(props.cards)
    ? props.cards.map((element, index) => ({
        ...element,
        onClick: () => setGoToSlide(index),
      }))
    : [];
  if (cardsInfo.length === 0) {
    return <p>Loading, No cards to display yet.</p>;
  }
  const [offsetRadius, setOffsetRadius] = useState(2);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards] = useState(cardsInfo);
  const [showArrows, setShowArrows] = useState(false);

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
