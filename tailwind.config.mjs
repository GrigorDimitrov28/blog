/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        baskerville: ["Libre Baskerville", "serif"],
      },
      keyframes: {
        "pop-up": {
          from: { right: "-100%" },
          to: { right: "0" },
        },
        "go-down": {
          from: { right: "0" },
          to: { right: "-100%" },
        },
      },
      animation: {
        up: "pop-up 0.4s linear forwards",
        down: "go-down 0.4s linear forwards",
      },
      filterButton: {
        backgroundColor: "black",
        color: "white",
      },
      colors: {
        cream: "#F8EDE3",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
