import f1 from "@/app/assets/구키/smoke1.png";
import f2 from "@/app/assets/구키/smoke2.png";
import f3 from "@/app/assets/구키/smoke3.png";
import f4 from "@/app/assets/구키/smoke4.png";
import f5 from "@/app/assets/구키/f1.png";
import f6 from "@/app/assets/구키/f2.png";
import f7 from "@/app/assets/구키/f3.png";
import bg from "@/app/assets/구키/bg.png";

import bgFlat from "@/app/assets/구키/bg2.png";

import cat from "@/app/assets/구키/cat.png";

const images = {
  main: cat,
  kettle: f5,
  songpyeon: f6,
  mug: f7,
  bg,
  bgFlat,
  floating: [
    {
      name: "f1",
      image: f3,
      width: 4,
      left: 45,
      top: -10,
    },
    {
      name: "f2",
      image: f2,
      width: 3,
      left: 47,
      top: 0,
    },
    {
      name: "f3",
      image: f1,
      width: 2,
      left: 50,
      top: 9,
      z: 1,
    },
    {
      name: "f4",
      image: f4,
      width: 10,
      left: 28,
      top: -35,
    },
  ],
};
export default images;
