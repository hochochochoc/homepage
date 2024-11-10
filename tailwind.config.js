/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "h-md": { raw: "(min-height: 710px)" },
      },
      width: {
        "before-width": "var-(--tw-before-width)",
      },
      colors: {
        egg: "#13141A",
      },
    },
  },
  plugins: [],
};
