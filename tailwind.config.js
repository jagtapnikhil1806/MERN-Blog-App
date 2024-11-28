/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinDot: {
          '0%, 50%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
        },
        pushInOut: {
          '0%, 50%, 100%': { transform: 'translate(0, 0)', backgroundColor: 'rgb(31 41 55)' },
          '25%': { transform: 'translate(-0.71rem, -0.71rem)', backgroundColor: 'rgb(249 115 22)' },
        },
        clipBottom: {
          '0%, 50%, 100%': { clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)' },
          '25%': { clipPath: 'polygon(0 25%, 100% 25%, 100% 100%, 0 100%)' },
        },
      },
      animation: {
        spinDot: 'spinDot 2s infinite',
        pulse: 'pushInOut 2s infinite',
        bounce: 'clipBottom 2s infinite',
      },
    },
  },
  plugins: [],
}

