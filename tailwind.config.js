/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'articulate-thin': ['ArticulateCF-Thin', 'sans-serif'],
        'articulate-extralight': ['ArticulateCF-ExtraLight', 'sans-serif'],
        'articulate-light': ['ArticulateCF-Light', 'sans-serif'],
        'articulate-normal': ['ArticulateCF-Normal', 'sans-serif'],
        'articulate-regular': ['ArticulateCF-Regular', 'sans-serif'],
        'articulate-medium': ['ArticulateCF-Medium', 'sans-serif'],
        'articulate-demibold': ['ArticulateCF-DemiBold', 'sans-serif'],
        'articulate-bold': ['ArticulateCF-Bold', 'sans-serif'],
        'articulate-extrabold': ['ArticulateCF-ExtraBold', 'sans-serif'],
        'articulate-heavy': ['ArticulateCF-Heavy', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

