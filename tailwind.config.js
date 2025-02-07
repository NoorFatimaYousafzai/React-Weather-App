/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#f0f7ff',
          500: '#3b82f6',
          600: '#2563eb',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'lg': '0.75rem',
      },
    },
  },
  plugins: [],
}

