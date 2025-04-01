/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        borderGlow: {
          "0%": { boxShadow: "0 0 5px #facc15" },
          "50%": { boxShadow: "0 0 15px #facc15, 0 0 5px #facc15 inset" },
          "100%": { boxShadow: "0 0 5px #facc15" },
        },
      },
      animation: {
        borderGlow: "borderGlow 1.5s infinite alternate",
      },
    },
  },
  plugins: [],
  

}

