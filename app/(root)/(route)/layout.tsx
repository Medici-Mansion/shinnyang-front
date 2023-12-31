import React, { PropsWithChildren } from "react";
import lazy from "next/dynamic";
import Logout from "@/components/modals/logout";
const Layout = lazy(() => import("@/components/layout"));

const OnBoardingLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <div className="relative flex flex-col space-y-2 p-[1.5rem] py-10 text-subtitle-notice02 text-white">
        <div className="font-semibold">
          <p>개인정보처리방침 | 이용약관</p>
          <div className="flex justify-between">
            <p className="font-normal">문의: medici.ideas@gmail.com</p>
            <Logout />
          </div>
        </div>
        <div className="opacity-50">
          <svg
            width="70"
            height="31"
            viewBox="0 0 70 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.07453 0.798357C4.53559 0.302665 3.81633 0 3.02637 0C1.35495 0 0 1.35495 0 3.02637V27.2373C0 28.9087 1.35495 30.2637 3.02637 30.2637C4.69778 30.2637 6.05274 28.9087 6.05274 27.2373L6.05274 9.50568L15.042 17.0213C16.3243 18.0933 18.2329 17.9229 19.305 16.6406C20.377 15.3583 20.2066 13.4497 18.9243 12.3777L5.07453 0.798357ZM31.0203 10.5923C32.6917 10.5923 34.0466 11.9472 34.0466 13.6187V27.2373C34.0466 28.9087 32.6917 30.2637 31.0203 30.2637C29.3489 30.2637 27.9939 28.9087 27.9939 27.2373V13.6187C27.9939 11.9472 29.3489 10.5923 31.0203 10.5923ZM34.0466 3.02637C34.0466 4.69779 32.6917 6.05274 31.0203 6.05274C29.3489 6.05274 27.9939 4.69779 27.9939 3.02637C27.9939 1.35495 29.3489 0 31.0203 0C32.6917 0 34.0466 1.35495 34.0466 3.02637ZM50.5043 12.6503C50.2742 12.4202 50.1591 12.1342 50.1591 11.7924C50.1591 11.467 50.2775 11.181 50.5141 10.9345C50.6292 10.8228 50.7574 10.7373 50.8987 10.6781C51.04 10.619 51.1879 10.5894 51.3424 10.5894C51.6678 10.5894 51.9472 10.711 52.1806 10.9542C52.4074 11.1909 52.5208 11.4736 52.5208 11.8023C52.5208 12.1408 52.4074 12.4235 52.1806 12.6503C51.9538 12.8771 51.6744 12.9905 51.3424 12.9905C51.0104 12.9905 50.7311 12.8771 50.5043 12.6503ZM51.3424 19.3309C51.0335 19.3309 50.7689 19.2225 50.5486 19.0055C50.3317 18.7853 50.2232 18.5174 50.2232 18.2019V14.7999C50.2232 14.5928 50.2725 14.4038 50.3711 14.2329C50.473 14.0587 50.6094 13.9223 50.7804 13.8237C50.9546 13.7218 51.1452 13.6709 51.3523 13.6709C51.5561 13.6742 51.7434 13.7267 51.9143 13.8286C52.0853 13.9305 52.22 14.0669 52.3186 14.2379C52.4205 14.4088 52.4715 14.5994 52.4715 14.8098V18.192C52.4715 18.5109 52.3614 18.7804 52.1411 19.0006C51.9209 19.2208 51.6547 19.3309 51.3424 19.3309ZM47.196 13.8484C47.2584 13.8714 47.3159 13.896 47.3685 13.9223V12.3545C47.3685 12.0455 47.4754 11.7825 47.689 11.5656C47.9059 11.3454 48.1722 11.2353 48.4877 11.2353C48.6882 11.2385 48.8739 11.2928 49.0449 11.398C49.2158 11.4999 49.3505 11.6379 49.4492 11.8121C49.5478 11.9863 49.5971 12.1737 49.5971 12.3742V18.1822C49.5971 18.3991 49.5478 18.593 49.4492 18.7639C49.3538 18.9316 49.2224 19.0631 49.0547 19.1584C48.9699 19.2066 48.8796 19.2426 48.7839 19.2665C48.6783 19.2986 48.5662 19.3158 48.4501 19.3158C48.0654 19.3158 47.725 19.1263 47.5171 18.8355C47.2038 19.1592 46.7977 19.3211 46.2986 19.3211C46.1639 19.3211 46.0012 19.3046 45.8105 19.2718C45.2813 19.1699 44.8245 18.9168 44.4399 18.5125C44.0586 18.1049 43.8121 17.6069 43.7003 17.0186C43.6675 16.8214 43.651 16.634 43.651 16.4565C43.651 16.2297 43.674 16.0177 43.7201 15.8205C43.8154 15.4162 43.9732 15.0596 44.1934 14.7506C44.4136 14.4416 44.6831 14.1951 45.002 14.0111C45.3865 13.7843 45.7941 13.6709 46.2247 13.6709C46.5369 13.6709 46.8607 13.73 47.196 13.8484ZM43.0643 16.8263C43.2057 16.6915 43.2763 16.4598 43.2763 16.1311C43.2665 15.8879 43.2024 15.6381 43.084 15.3817C42.969 15.122 42.8079 14.8772 42.6009 14.6471C42.3971 14.4137 42.1604 14.2181 41.8909 14.0604C41.4504 13.8106 40.9492 13.6807 40.3871 13.6709C39.9631 13.6709 39.5687 13.7415 39.2038 13.8829C38.839 14.0242 38.5234 14.2181 38.2572 14.4647C37.9942 14.7079 37.7839 15.0004 37.6261 15.3423C37.4716 15.6808 37.3895 16.0358 37.3796 16.4072C37.3796 16.8279 37.4552 17.2158 37.6064 17.5708C37.7576 17.9258 37.9795 18.2348 38.272 18.4977C38.5645 18.7607 38.9146 18.9644 39.3222 19.1091C39.733 19.2504 40.1833 19.3211 40.6731 19.3211C40.9097 19.3211 41.1316 19.3079 41.3387 19.2816C41.6345 19.2455 41.9238 19.1847 42.2064 19.0992C42.4365 19.017 42.614 18.9382 42.7389 18.8626C42.8671 18.7837 42.969 18.6949 43.0446 18.5963C43.1235 18.4977 43.181 18.3859 43.2172 18.261C43.2303 18.215 43.2369 18.1509 43.2369 18.0688C43.2369 17.842 43.1564 17.6513 42.9953 17.4968C42.8375 17.3424 42.6255 17.2651 42.3593 17.2651C42.2607 17.2651 42.0914 17.2947 41.8514 17.3539C41.5392 17.4393 41.2812 17.487 41.0774 17.4968C40.867 17.4968 40.6879 17.487 40.54 17.4673C40.3921 17.4442 40.2737 17.4163 40.185 17.3834C40.0995 17.3473 40.0091 17.293 39.9138 17.2207C39.8053 17.1123 39.7445 17.0482 39.7314 17.0285H42.3593C42.688 17.0285 42.923 16.9611 43.0643 16.8263ZM53.5562 18.1526C53.1782 17.63 52.9892 17.0712 52.9892 16.4762C52.9925 16.1739 53.0549 15.8682 53.1765 15.5592C53.2981 15.2469 53.4641 14.9659 53.6745 14.7161C53.829 14.5452 53.9736 14.4088 54.1084 14.3069C54.3713 14.1097 54.6589 13.9634 54.9712 13.8681C55.2834 13.7695 55.6319 13.7202 56.0164 13.7202C56.2268 13.7202 56.3862 13.7267 56.4947 13.7399C57.6188 13.8549 58.1809 14.3151 58.1809 15.1204C58.1414 15.3636 58.0313 15.5592 57.8505 15.7071C57.6697 15.855 57.4462 15.929 57.18 15.929C57.1307 15.929 57.0732 15.9224 57.0074 15.9093L56.9581 15.8994L56.6968 15.8402L56.5637 15.8106L56.3517 15.7663C56.2925 15.7531 56.2021 15.7466 56.0805 15.7466C55.8176 15.7466 55.6072 15.8205 55.4494 15.9684C55.2917 16.113 55.2128 16.3086 55.2128 16.5551C55.2226 16.703 55.2588 16.8279 55.3212 16.9298C55.3837 17.0285 55.4774 17.1156 55.6023 17.1912C55.737 17.2668 55.8866 17.3046 56.0509 17.3046C56.1397 17.3046 56.2465 17.2947 56.3714 17.275H56.401L56.756 17.1912C56.8513 17.1681 56.9795 17.1517 57.1405 17.1418C57.4692 17.1418 57.7273 17.2405 57.9146 17.4377C58.1053 17.6349 58.2006 17.9061 58.2006 18.2512C58.171 18.4681 58.0773 18.6571 57.9195 18.8182C57.7618 18.976 57.5268 19.0992 57.2145 19.188C56.9022 19.2767 56.5177 19.3211 56.0608 19.3211C55.5119 19.3112 55.0254 19.2093 54.6014 19.0154C54.1807 18.8182 53.8323 18.5306 53.5562 18.1526ZM59.7734 19.3309C59.4644 19.3309 59.1998 19.2225 58.9796 19.0055C58.7626 18.7853 58.6542 18.5174 58.6542 18.2019V14.7999C58.6542 14.5928 58.7035 14.4038 58.8021 14.2329C58.904 14.0587 59.0404 13.9223 59.2113 13.8237C59.3855 13.7218 59.5762 13.6709 59.7832 13.6709C59.987 13.6742 60.1744 13.7267 60.3453 13.8286C60.5162 13.9305 60.651 14.0669 60.7496 14.2379C60.8515 14.4088 60.9024 14.5994 60.9024 14.8098V18.192C60.9024 18.5109 60.7923 18.7804 60.5721 19.0006C60.3519 19.2208 60.0856 19.3309 59.7734 19.3309ZM58.5901 11.7924C58.5901 12.1342 58.7051 12.4202 58.9352 12.6503C59.162 12.8771 59.4414 12.9905 59.7734 12.9905C60.1053 12.9905 60.3847 12.8771 60.6115 12.6503C60.8383 12.4235 60.9517 12.1408 60.9517 11.8023C60.9517 11.4736 60.8383 11.1909 60.6115 10.9542C60.3782 10.711 60.0988 10.5894 59.7734 10.5894C59.6189 10.5894 59.471 10.619 59.3296 10.6781C59.1883 10.7373 59.0601 10.8228 58.9451 10.9345C58.7084 11.181 58.5901 11.467 58.5901 11.7924ZM44.0652 29.9058C43.8482 29.679 43.7398 29.4095 43.7398 29.0972V25.7051L43.74 25.677L43.7395 25.6545L43.7394 25.6388C43.7394 25.0465 44.2195 24.5664 44.8117 24.5664C45.2093 24.5664 45.5563 24.7674 45.7415 25.0888C45.7645 25.0658 45.8122 25.0313 45.8845 24.9853C46.3479 24.7026 46.8048 24.5613 47.2551 24.5613C47.3833 24.5613 47.5444 24.5794 47.7383 24.6155C48.067 24.6845 48.3563 24.8111 48.6061 24.9952C48.8559 25.1792 49.0465 25.4011 49.178 25.6608C49.3095 25.9204 49.3752 26.1949 49.3752 26.4841V29.0972C49.3752 29.3076 49.3243 29.4982 49.2224 29.6691C49.1238 29.8401 48.989 29.9765 48.8181 30.0784C48.6471 30.1803 48.4598 30.2329 48.256 30.2361C47.9405 30.2361 47.6709 30.1277 47.4474 29.9107C47.2239 29.6938 47.1122 29.4259 47.1122 29.1071V26.987C47.1122 26.8293 47.0563 26.6978 46.9445 26.5926C46.8393 26.471 46.7079 26.4102 46.5501 26.4102C46.3923 26.4102 46.2608 26.4644 46.1557 26.5729C46.0406 26.6978 45.9831 26.8358 45.9831 26.987V29.0972C45.9831 29.4128 45.8713 29.6823 45.6478 29.9058C45.4342 30.1195 45.1729 30.2263 44.8639 30.2263C44.5549 30.2263 44.2887 30.1195 44.0652 29.9058ZM50.4106 29.8466C49.9767 29.5771 49.7598 29.2862 49.7598 28.974C49.7598 28.8786 49.7746 28.7948 49.8041 28.7225C49.86 28.545 49.9652 28.4053 50.1197 28.3034C50.2742 28.1983 50.4615 28.1457 50.6818 28.1457C50.8165 28.1457 50.9809 28.1769 51.1748 28.2393L51.3769 28.2985L51.5199 28.3478C51.7434 28.4398 51.9456 28.4974 52.1264 28.5204H52.3088C52.3975 28.5204 52.4567 28.4908 52.4863 28.4316C52.4863 28.3297 52.4501 28.2558 52.3778 28.2098C52.3745 28.2065 52.3679 28.2032 52.3581 28.1999C52.3482 28.1933 52.3384 28.1884 52.3285 28.1851C52.3219 28.1785 52.3153 28.1736 52.3088 28.1703L52.2151 28.1358L52.013 28.0865L51.7516 28.0076L51.5594 27.9583C51.257 27.8761 51.0055 27.7874 50.805 27.6921C50.6078 27.5935 50.4517 27.4833 50.3366 27.3617C50.2249 27.2401 50.1312 27.0922 50.0556 26.918C49.98 26.7306 49.9422 26.5416 49.9422 26.351C49.9422 26.0355 50.0424 25.7396 50.2429 25.4635C50.4435 25.1842 50.7294 24.9623 51.1008 24.7979C51.4755 24.6336 51.9111 24.5514 52.4074 24.5514C52.792 24.5514 53.1354 24.5925 53.4378 24.6747C53.9144 24.8062 54.2382 24.9853 54.4091 25.2121C54.4946 25.3271 54.5373 25.4685 54.5373 25.6361C54.5373 25.7972 54.4864 25.9467 54.3845 26.0848C54.2826 26.2195 54.1445 26.3083 53.9703 26.351C53.8914 26.3707 53.8109 26.3806 53.7287 26.3806C53.6005 26.3806 53.4329 26.3543 53.2258 26.3017L52.9201 26.2277L52.7722 26.1883L52.6095 26.1587L52.5884 26.1533C52.5347 26.1395 52.4566 26.1194 52.3918 26.1194L52.3642 26.1193C52.2949 26.1187 52.2135 26.1179 52.1658 26.1489L52.1165 26.1982C52.0935 26.2212 52.082 26.2425 52.082 26.2623C52.082 26.305 52.1165 26.351 52.1855 26.4003C52.1987 26.4069 52.2102 26.4135 52.22 26.42C52.2299 26.4266 52.2414 26.4332 52.2545 26.4398L52.3482 26.4743L52.8511 26.6419L53.1026 26.7159L53.3244 26.7947C53.5348 26.8605 53.7583 26.9722 53.995 27.13C54.2185 27.2845 54.3878 27.4768 54.5028 27.7069C54.6211 27.9337 54.6803 28.1687 54.6803 28.4119C54.6803 28.9247 54.4518 29.3651 53.995 29.7332C53.571 30.0751 53.004 30.246 52.294 30.246C52.202 30.246 52.054 30.2394 51.8503 30.2263C51.2422 30.1803 50.7623 30.0537 50.4106 29.8466ZM56.2531 30.2361C55.9441 30.2361 55.6795 30.1277 55.4593 29.9107C55.2424 29.6905 55.1339 29.4226 55.1339 29.1071V25.7051C55.1339 25.4981 55.1832 25.3091 55.2818 25.1381C55.3837 24.9639 55.5201 24.8275 55.691 24.7289C55.8652 24.627 56.0559 24.5761 56.2629 24.5761C56.4667 24.5794 56.6541 24.6319 56.825 24.7338C56.9959 24.8357 57.1307 24.9721 57.2293 25.1431C57.3312 25.314 57.3821 25.5046 57.3821 25.715V29.0972C57.3821 29.4161 57.272 29.6856 57.0518 29.9058C56.8316 30.126 56.5653 30.2361 56.2531 30.2361ZM55.0698 22.6976C55.0698 23.0395 55.1848 23.3254 55.4149 23.5555C55.6417 23.7823 55.9211 23.8957 56.2531 23.8957C56.5851 23.8957 56.8644 23.7823 57.0912 23.5555C57.318 23.3287 57.4314 23.046 57.4314 22.7075C57.4314 22.3788 57.318 22.0961 57.0912 21.8595C56.8579 21.6162 56.5785 21.4946 56.2531 21.4946C56.0986 21.4946 55.9507 21.5242 55.8093 21.5833C55.668 21.6425 55.5398 21.728 55.4248 21.8397C55.1881 22.0862 55.0698 22.3722 55.0698 22.6976ZM59.374 29.8812C59.8309 30.1342 60.3354 30.2608 60.8876 30.2608C61.4464 30.2608 61.9575 30.1293 62.421 29.8664C62.7299 29.6889 62.9945 29.4703 63.2148 29.2106C63.435 28.9477 63.5993 28.6601 63.7078 28.3478C63.8196 28.0356 63.8754 27.7167 63.8754 27.3913C63.8754 27.1974 63.8557 27.0035 63.8163 26.8095C63.7768 26.6156 63.716 26.4282 63.6339 26.2475C63.555 26.0667 63.4531 25.8925 63.3282 25.7248C63.2066 25.5572 63.0636 25.4027 62.8992 25.2614C62.6297 25.028 62.3257 24.8489 61.9871 24.724C61.6486 24.5958 61.2821 24.5317 60.8876 24.5317C60.3321 24.5317 59.826 24.6615 59.3691 24.9212C58.9122 25.1809 58.5523 25.5342 58.2893 25.9812C58.0297 26.425 57.8998 26.9049 57.8998 27.4209C57.9031 27.9369 58.0362 28.4135 58.2992 28.8507C58.5621 29.2846 58.9204 29.6281 59.374 29.8812ZM64.3685 29.0972C64.3685 29.4095 64.477 29.679 64.6939 29.9058C64.9174 30.1195 65.1836 30.2263 65.4926 30.2263C65.8016 30.2263 66.0629 30.1195 66.2765 29.9058C66.5 29.6823 66.6118 29.4128 66.6118 29.0972V26.987C66.6118 26.8358 66.6693 26.6978 66.7844 26.5729C66.8895 26.4644 67.021 26.4102 67.1788 26.4102C67.3366 26.4102 67.468 26.471 67.5732 26.5926C67.685 26.6978 67.7409 26.8293 67.7409 26.987V29.1071C67.7409 29.4259 67.8526 29.6938 68.0761 29.9107C68.2996 30.1277 68.5692 30.2361 68.8847 30.2361C69.0885 30.2329 69.2758 30.1803 69.4468 30.0784C69.6177 29.9765 69.7525 29.8401 69.8511 29.6691C69.953 29.4982 70.0039 29.3076 70.0039 29.0972V26.4841C70.0039 26.1949 69.9382 25.9204 69.8067 25.6608C69.6752 25.4011 69.4846 25.1792 69.2348 24.9952C68.985 24.8111 68.6957 24.6845 68.367 24.6155C68.1731 24.5794 68.012 24.5613 67.8838 24.5613C67.4335 24.5613 66.9766 24.7026 66.5132 24.9853C66.4409 25.0313 66.3932 25.0658 66.3702 25.0888C66.1841 24.7713 65.8392 24.5664 65.4445 24.5664C64.8705 24.5664 64.4019 25.0174 64.3735 25.5843C64.3702 25.6236 64.3685 25.6639 64.3685 25.7051V29.0972ZM61.784 27.3767C61.784 27.9077 61.3866 28.3381 60.8965 28.3381C60.4064 28.3381 60.0091 27.9077 60.0091 27.3767C60.0091 26.8458 60.4064 26.4153 60.8965 26.4153C61.3866 26.4153 61.784 26.8458 61.784 27.3767ZM46.2538 17.3931C46.7439 17.3931 47.1412 16.9626 47.1412 16.4317C47.1412 15.9007 46.7439 15.4703 46.2538 15.4703C45.7637 15.4703 45.3664 15.9007 45.3664 16.4317C45.3664 16.9626 45.7637 17.3931 46.2538 17.3931ZM41.0543 15.7695C41.0768 15.848 41.0087 15.9155 40.927 15.9155H40.4093H39.8917C39.81 15.9155 39.7418 15.848 39.7643 15.7695C39.7936 15.6673 39.8534 15.5729 39.9387 15.4971C40.0635 15.3862 40.2328 15.3238 40.4093 15.3238C40.5858 15.3238 40.7551 15.3862 40.88 15.4971C40.9653 15.573 41.025 15.6673 41.0543 15.7695ZM43.1277 29.282V25.5347C43.1072 24.9259 42.6072 24.4387 41.9935 24.4387C41.5727 24.4387 41.2054 24.6677 41.0094 25.0079C40.7153 24.7816 40.3628 24.6685 39.9521 24.6685C39.8371 24.6685 39.6758 24.6893 39.4681 24.7308C39.0976 24.8043 38.7574 24.964 38.4475 25.21C38.1376 25.4528 37.8869 25.761 37.6952 26.1348C37.5067 26.5085 37.4013 26.9158 37.3789 27.3567C37.3789 27.6985 37.4141 28.002 37.4844 28.2671C37.5546 28.5323 37.6601 28.783 37.8006 29.0194C38.0083 29.3325 38.2526 29.5865 38.5338 29.7813C38.8149 29.973 39.104 30.0976 39.4011 30.1551C39.6087 30.1934 39.7956 30.2126 39.9617 30.2126C40.4077 30.2126 40.7727 30.0903 41.0566 29.8459C41.261 30.1443 41.6044 30.3402 41.9935 30.3402C42.5839 30.3402 43.0689 29.8894 43.1233 29.3132C43.1249 29.3029 43.1264 29.2925 43.1277 29.282ZM40.1007 28.4478C40.6021 28.4478 41.0086 28.0075 41.0086 27.4642C41.0086 26.921 40.6021 26.4807 40.1007 26.4807C39.5993 26.4807 39.1928 26.921 39.1928 27.4642C39.1928 28.0075 39.5993 28.4478 40.1007 28.4478Z"
              fill="white"
            />
          </svg>
          <span>
            &copy; {new Date().getFullYear()}. Medici Mansion. All Rights
            Reserved.
          </span>
        </div>
      </div>
    </>
  );
};

export default OnBoardingLayout;
