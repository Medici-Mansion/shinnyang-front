"use client";
import React from "react";
import Snowfall from "react-snowfall";

const Snow = () => {
  return (
    <Snowfall
      color="white"
      radius={[1, 5]}
      wind={[-10.5, 10.0]}
      rotationSpeed={[-1.0, 10.0]}
      style={{ backgroundColor: "transparent", zIndex: 0 }}
      snowflakeCount={120}
    />
  );
};

export default Snow;
