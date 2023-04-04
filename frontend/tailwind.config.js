/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        impact: ['Impact', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        'video-portrait': '9 / 16',
      },
      backgroundImage: {
        roadmap: "url('../assets/images/roadmap.png')",
        ourteam: "url('../assets/images/ellipse1.png')",
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
  },
}
