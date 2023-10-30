/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: "#fdf7ed",
        secondary: "#5e7b96",
        tertiary: "#ecdccc",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        cardlight:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ['Christopher wells','sans-serif'],
        body: ['Montserrat','serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

