/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"LXGW WenKai"', '"Songti SC"', '"STSong"', 'serif'],
        body: ['"Noto Serif SC"', '"LXGW WenKai"', '"Songti SC"', '"STSong"', 'serif'],
      },
    },
  },
  plugins: [],
}
