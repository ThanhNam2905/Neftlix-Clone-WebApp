module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-to-b-custom': 
            'linear-gradient(to bottom, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.15) 15%,  rgba(20, 20, 20, 0.35) 30%,  rgba(20, 20, 20, 0.58) 45%, #141414 68%, #141414 100%);',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
}
