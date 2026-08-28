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
        },
        paper: '#F4F5F6',
        'paper-2': '#EAEBEC',
        card: '#ECEDEE',
        'card-raised': '#FFFFFF',
        ink: '#17171A',
        'ink-2': '#6E7075',
        'ink-3': '#A2A5AA',
        accent: '#1391E2',
        'accent-2': '#7FC4EF',
        'accent-3': '#D3E9F9',
        pill: '#21201E',
        hairline: '#DFE1E3',
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
