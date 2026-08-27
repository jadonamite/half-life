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
        luxury: ['Instrument Serif', 'Didot', 'Bodoni MT', 'Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['Fragment Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        paper: '#ebeaef',
        'paper-light': '#f5f4f8',
        'paper-dark': '#dfdee4',
        ink: '#121214',
        'ink-muted': '#5c5b66',
        muted: '#71707b',
        line: '#e1e0e6',
        'line-dark': '#2e2e36',
        accent: '#eb5939',
        'accent-emerald': '#10b981',
        'accent-cyan': '#00f2fe',
        'accent-blue': '#4facfe',
        dark: {
          bg: '#0c0c0e',
          card: '#151519',
          surface: '#1b1b22',
          border: '#262630',
        },
      },
      maxWidth: {
        site: '1160px',
        hero: '980px',
      },
      boxShadow: {
        framer: '0 10px 30px -5px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        pill: '0 4px 16px rgba(0, 0, 0, 0.06)',
        'pill-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        card: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        float: '0 25px 50px -12px rgba(0, 0, 0, 0.14)',
        dark: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'noise-pattern': "url('/images/noise.png')",
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, #fbfafc 0%, #ebeaef 55%, #dfdee4 100%)',
        'footer-gradient': 'radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.07) 0%, transparent 60%), linear-gradient(180deg, #111114 0%, #09090b 100%)',
      },
    },
  },
  plugins: [],
};
