module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {
    colors: { bg: '#0b0c10', card: '#12141b', line: '#23262f', accent: '#ccff00' },
    fontFamily: { display: ['var(--font-oswald)', 'sans-serif'], sans: ['var(--font-inter)', 'sans-serif'] },
  } },
};
