"use client";
import React, { HTMLAttributes } from "react";
import Snowfall from "react-snowfall";
import { SnowflakeProps } from "react-snowfall/lib/Snowflake";

type SnowProps = SnowflakeProps & HTMLAttributes<HTMLCanvasElement>;

const Snow = (props?: Partial<SnowProps>) => {
  return (
    <Snowfall
      color="white"
      radius={[0.5, 3]}
      speed={[0.5, 3]}
      wind={[-0.5, 1]}
      snowflakeCount={62}
      {...props}
    />
  );
};

export default Snow;
