/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Switzer', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        premium: {
          bg: '#F0F1F2',
          glass: 'rgba(255, 255, 255, 0.45)',
          'glass-border': 'rgba(255, 255, 255, 0.65)',
          'text-main': '#1C1C1D',
          'text-muted': '#7A7B7E',
          'button-dark': '#232323',
          accent: '#E66F42', // orange-ish for the chart
          purple: '#673AB7', // purple-ish for chart
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        'pill': '9999px',
      },
      boxShadow: {
        'glass': '0 40px 100px -20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'float': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
