/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-100': '#8E9AAF',
        'light-200': '#CBC0D3',
        'light-300': '#EFD3D7',
        'light-400': '#FEEAFA',
        'light-500': '#DEE2FF',
        'light-600': '#FFFDFA',
        'dark-100': '#2E3440',
        'dark-200': '#3B4252',
        'dark-300': '#434C5E',
        'dark-400': '#4C566A',
        'dark-500': '#3a4b6e',
      },
      gridTemplateColumns: {
        'quarter': '150px 1fr',
      },
      backgroundImage: {
        'light': `url(${process.env.REACT_APP_BASE_SERVER_URL}/assets/light.jpg)`,
        'dark': `url(${process.env.REACT_APP_BASE_SERVER_URL}/assets/dark.jpg)`
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },     
  }
}

