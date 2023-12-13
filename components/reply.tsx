"use client";
import React from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
const Reply = ({ items }: { items?: string[] }) => {
  const [emblaRef, ...rest] = useEmblaCarousel({});
  console.log(emblaRef, ...rest, "<<emblaRef,...rest");
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="flex">
          {items?.map((value, index) => {
            return (
              <div
                className="text-center"
                style={{
                  flex: "0 0 100%",
                }}
                key={index}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reply;
