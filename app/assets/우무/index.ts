import 윷좌측 from "@/app/assets/우무/U_l.png";
import 윷우측아래 from "@/app/assets/우무/U_rb.png";
import 윷중간아래 from "@/app/assets/우무/U_mb.png";
import 중간위 from "@/app/assets/우무/U_mu.png";
import 효과우측 from "@/app/assets/우무/E_r.png";
import 효과좌측 from "@/app/assets/우무/E_l.png";
import bg from "@/app/assets/우무/bg.png";
import bgFlat from "@/app/assets/우무/bgFlat.png";

import main from "@/app/assets/우무/main.png";

const images = {
  floating: [
    {
      name: "윷좌측",
      image: 윷좌측,
      width: 20,
      left: 10,
      top: -25,
    },
    {
      name: "윷우측아래",
      image: 윷우측아래,
      width: 20,
      left: 80,
      top: -17,
    },
    {
      name: "윷중간아래",
      image: 윷중간아래,
      width: 20,
      left: 66,
      top: -31,
    },
    {
      name: "중간위",
      image: 중간위,
      width: 20,
      left: 62,
      top: -38,
    },
    {
      name: "효과우측",
      image: 효과우측,
      width: 7,
      left: 80,
      top: -25,
    },
    {
      name: "효과좌측",
      image: 효과좌측,
      width: 6.5,
      left: 10,
      top: -5,
    },
  ],
  main,
  bg,
  bgFlat,
};

export default images;
