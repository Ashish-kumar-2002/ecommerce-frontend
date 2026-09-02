/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        customBlue: "rgba(28, 100, 242, 1)",
        banner: {
          color1: "#FDC200",
          color2: "#FF6B6B",
          color3: "#4ECDC4",
          color4: "#A78BFA",
          color5: "#34D399",
        },
      },
      backgroundImage: {
        hero: "url('/images/hero-bg.jpg')",
        banner1: "url('/images/banner1.jpg')",
        banner2: "url('/images/banner2.jpg')",
      },
    },
  },
  plugins: [],
};