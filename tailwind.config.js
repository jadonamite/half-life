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
        mono: ['Fragment Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
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
        card: '18px',
        panel: '24px',
        pill: '12px',
        chip: '9px',
      },
      maxWidth: {
        site: '1240px',
        hero: '980px',
      },
      boxShadow: {
        framer: '0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        pill: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'pill-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        card: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        float: '0 25px 50px -12px rgba(0, 0, 0, 0.14)',
      },
    },
  },
  plugins: [],
};
