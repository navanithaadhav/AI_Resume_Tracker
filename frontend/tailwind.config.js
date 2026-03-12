module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#059669', // Emerald 600
          dark: '#047857',
          light: '#34d399',
        },
        secondary: {
          DEFAULT: '#0d9488', // Teal 600
          dark: '#0f766e',
          light: '#2dd4bf',
        },
        accent: '#f59e0b', // Amber 500
        surface: {
          50: '#fafafa', // Zinc 50
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        danger: '#e11d48', // Rose 600
        success: '#10b981',
        warning: '#f59e0b',
      },
      boxShadow: {
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}


