/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D3557',
        secondary: '#457B9D',
        success: '#2cc47f',
        warning: '#E9C46A',
        error: '#E76F51',
        back: "#457B9D",
        back_login: "#b4e4f7",
        border_input: "#0ca7e7"
      },
      height: {
        "5/7": "90%"
      },
      screens: {
        '3xl': '1700px'
      },
      maxWidth: {
        'm-logo': '200px'
      },
      minWidth: {
        'm-logo': '200px'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

