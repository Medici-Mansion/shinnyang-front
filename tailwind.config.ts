const { fontFamily } = require("tailwindcss/defaultTheme");
import plaiceholder from "@plaiceholder/tailwindcss";
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
        sans: ["var(--font-sans)"],
        umu: ["var(--font-umu)"],
        cheezu: ["var(--font-cheezu)"],
        gookie: ["var(--font-gookie)"],
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
        kakao: "white",
        gray: {
          600: "#767676",
          500: "#999999",
          400: "#CCCCCC",
          300: "#DDDDDD",
          200: "#EDEDED",
          100: "#F6F6F6",
        },
        activate: "hsl(var(--activate))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
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
  ],
};
