module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-radial': 'pulse-radial 4s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
