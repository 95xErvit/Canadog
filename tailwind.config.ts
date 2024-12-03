
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
        screens: 
    {
        'mn': '340px',
        'xs': '500px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'xxl': '1920px',
    },
    extend: {
      colors: {
        white: '#FFFFFF',
        gray: '#5C5C5C',  
        pinkGora: '#FCBCAC',
        blackGora: '#3F3F3F',
        greenCanadog: '#1C8C58',
        mentaCanadog: '#69C699',
        orangeGora: '#FDB104',
        pinkLightGora: '#FCEBD7',
        purpleGora: '#5418AD',
        redGora: '#DF6536',
      },
      fontFamily: {
        AkrobatBL: [
          'AkrobatBL',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        AkrobatEL: [
          'AkrobatEL',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        AkrobatR: ['AkrobatR', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
        AkrobatSB: [
          'AkrobatSB',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
        AkrobatB: ['AkrobatB', 'Helvetica', 'Verdana', 'Tahoma', 'sans-serif'],
        AkrobatEB: [
          'AkrobatEB',
          'Helvetica',
          'Verdana',
          'Tahoma',
          'sans-serif',
        ],
      },
      dropShadow: {
        card: '1px 1px 1px rgba(197, 195, 197, 0.75)',
        input: '2px 3px 3px rgb(184, 184, 184, 0.75)',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      }, 
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};