/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        myBlue: "#1fb6ff",
        myPurple: "#7e5bef",
      },
      backgroundImage: (theme) => ({
        pattern:
          "url('https://i.pinimg.com/564x/a4/b4/f7/a4b4f72d367b386cb9b6cb69da9038e6.jpg')",
      }),
    },
  },
  plugins: [],
};
