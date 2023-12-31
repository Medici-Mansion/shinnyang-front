import plaiceholder from "@plaiceholder/tailwindcss";
import plugin from "tailwindcss/plugin";
import fs from "node:fs";
import path from "node:path";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      maxWidth: {
        anchor: "var(--max-width)",
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
        umu: ["var(--font-umu)"],
        cheezu: ["var(--font-cheezu)"],
        gookie: ["var(--font-gookie)"],
      },
      fontSize: {
        // 타이틀 시작
        ["title-large"]: [
          "26px",
          {
            lineHeight: "36px",
            fontWeight: "600",
            letterSpacing: "-0.1rem",
          },
        ],
        ["title-home"]: [
          "1.5rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        ["title-medium"]: [
          "1rem",
          {
            fontWeight: "600",
          },
        ],
        ["title-regular"]: ["0.8rem", "1.3rem"],
        ["title-umu"]: ["1.1rem", "1.6rem"],
        ["title-cheezu"]: ["1.1rem", "1.6rem"],
        ["title-gookie"]: ["1.1rem", "1.6rem"],
        // 타이틀 끝
        // Letter 시작
        ["letter-cheezu"]: ["1rem", "1.8rem"],
        ["letter-umu"]: ["0.9rem", "1.8rem"],
        ["letter-gookie"]: ["0.8rem", "1.8rem"],
        // Letter 끝

        // Subtitle 시작
        ["subtitle-button"]: [
          "16px",
          {
            lineHeight: "auto",
            fontWeight: "700",
          },
        ],
        ["subtitle-popup"]: [
          "18px",
          {
            lineHeight: "28px",
            fontWeight: "400",
          },
        ],
        ["subtitle-menu"]: [
          "14px",
          {
            lineHeight: "auto",
            fontWeight: "500",
          },
        ],
        ["subtitle-notice01"]: [
          "12px",
          {
            lineHeight: "auto",
            fontWeight: "700",
          },
        ],
        ["subtitle-notice02"]: [
          "12px",
          {
            lineHeight: "auto",
            fontWeight: "400",
          },
        ],
      },
      colors: {
        wood: {
          DEFAULT: "#603F37",
          deep: "#300815",
        },
        red: "#B20000",
        sub: "#F1E5D1",
        background: "#FFF9EF",
        black: "#111111",
        kakao: "#FFCD29",
        gray: {
          600: "#767676",
          500: "#999999",
          400: "#CCCCCC",
          300: "#DDDDDD",
          200: "#EDEDED",
          100: "#F6F6F6",
        },
        point: {
          500: "#39221B",
          400: "#BA7032",
          300: "#A88A76",
          200: "#DDA973",
          100: "#ECD2B9",
        },
        modal: {
          border: "#BA7032",
          bg: "#FFF9EF",
          active: {
            bg: "#DDA973",
            border: "#39221B",
          },
        },
        activate: "hsl(var(--activate))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          // CUSTOM
          red: "#B20000",
          beige: "#F1E5D1",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          black: "#111111",
          white: "#FFFFFF",
          bg: "#FFF9EF",
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          "50%": {
            opacity: "0.2",
          },
        },
      },
      textShadow: {
        sm: "0.1rem 0.1rem 0.1rem var(--tw-shadow-color)",
        DEFAULT: "0.1rem 0.2rem 0.2rem var(--tw-shadow-color)",
        md: "0.1rem 0.3rem 0.3rem var(--tw-shadow-color)",
        lg: "0.1rem 0.4rem 0.4rem var(--tw-shadow-color)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plaiceholder({
      resolver: (src) => fs.readFileSync(path.join("./public", `${src}.png`)),
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
};
