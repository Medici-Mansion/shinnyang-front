import f1 from "@/app/assets/체즈/1.png";
import f2 from "@/app/assets/체즈/2.png";
import f3 from "@/app/assets/체즈/3.png";
import f4 from "@/app/assets/체즈/4.png";
import f5 from "@/app/assets/체즈/5.png";
import bg from "@/app/assets/체즈/bg.png";

import cat from "@/app/assets/체즈/cat.png";

const images = {
  main: cat,
  bg,
  bgFlat: bg,
  floating: [
    {
      name: "f1",
      image: f1,
      width: 10,
      left: 10,
      top: -25,
    },

    {
      name: "f2",
      image: f2,
      width: 7,
      left: 20,
      top: -33,
    },
    {
      name: "f3",
      image: f3,
      width: 10,
      left: 64,
      top: -34,
      z: 1,
    },
    {
      name: "f4",
      image: f4,
      width: 10,
      left: 67,
      top: -30,
    },
    {
      name: "f5",
      image: f5,
      width: 7,
      left: 85,
      top: -32,
    },
  ],
};
export default images;
