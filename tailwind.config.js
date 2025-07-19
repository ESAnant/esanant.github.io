/* Tailwind v3 config – lean & focused */
import plugin from 'tailwindcss/plugin';
import daisyui from 'daisyui';

export default {
  content: [
    './index.html',
    './story.js',           // interaction logic
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace'],
      },
      backgroundImage: {
        /* faint grid like reactbits.dev */
        'grid':
          'linear-gradient(transparent 95%,rgba(255,255,255,0.03) 95%),' +
          'linear-gradient(90deg,transparent 95%,rgba(255,255,255,0.03) 95%)',
      },
      animation: {
        'spin-slow': 'spin 6s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(.4,0,.6,1) infinite',
      },
    },
  },
  plugins: [
    daisyui,
    /* utility for snap-scroll (snap-y mandatory) */
    plugin(({ addUtilities }) => {
      addUtilities({
        '.snap': {
          'scroll-snap-type': 'y mandatory',
        },
        '.snap-start': {
          'scroll-snap-align': 'start',
        },
      });
    }),
  ],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#0ea5e9',
          'primary-content': '#ffffff',
        },
      },
    ],
  },
};
