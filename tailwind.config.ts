import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs NaviGuide
        'nav-blue': '#246BFD',
        'nav-green': '#19C37D',
        'nav-bg': '#0B1220',
        'nav-ink': '#0F172A',
        // Couleurs dashboard
        'dashboard-purple': '#667eea',
        'dashboard-purple-dark': '#764ba2',
        // Couleurs standards
        'blue': {
          DEFAULT: '#007bff',
          50: '#E3F2FD',
          100: '#BBDEFB',
          200: '#90CAF9',
          300: '#64B5F6',
          400: '#42A5F5',
          500: '#007bff',
          600: '#1E88E5',
          700: '#1976D2',
          800: '#1565C0',
          900: '#0D47A1',
        },
        'green': {
          DEFAULT: '#28a745',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#28a745',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blue-green': 'linear-gradient(135deg, #007bff, #28a745)',
        'gradient-purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      boxShadow: {
        'blue': '0 6px 20px rgba(0, 123, 255, 0.3)',
        'green': '0 6px 20px rgba(40, 167, 69, 0.3)',
        'card': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
