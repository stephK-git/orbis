/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand:   '#F5ECD7',
        terra:  '#C4622D',
        sun:    '#F0A500',
        savane: '#3D6B4F',
        dark:   '#1E1A14',
        text:   '#2C2416',
        muted:  '#8C7B60',
        cream:  '#FFFDF8',
      },
      fontFamily: {
        syne:   ['Syne', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
