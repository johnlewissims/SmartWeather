/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sw-bg': '#020617',
        'sw-surface': 'rgba(255,255,255,0.045)',
        'sw-border': 'rgba(255,255,255,0.09)',
        'sw-text': '#f1f5f9',
        'sw-muted': '#64748b',
        'sw-accent': '#06b6d4',
        'sw-accent-text': '#a5f3fc',
      },
      fontSize: {
        'base': '13px',
        'lg-text': '15.5px',
      },
      animation: {
        'pulse-slow': 'pulseSlow 1.8s ease-in-out infinite',
        'slide-in': 'slideIn 0.22s ease-out',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239,68,68,0.7)' },
          '60%': { boxShadow: '0 0 0 10px rgba(239,68,68,0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
