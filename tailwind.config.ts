import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      colors: {
        tbPrimary: {
          DEFAULT: '#FFD25E',
          foreground: 'rgb(var(--color-primary) / <alpha-value>)',
        },
        tbSecondary: {
          DEFAULT: '#FFEFCA',
          foreground: 'rgb(var(--color-secondary) / <alpha-value>)',
        },
        tbGreen: {
          DEFAULT: '#CCF39A',
          foreground: 'rgb(var(--color-popup) / <alpha-value>)',
        },
        tbBlue: {
          DEFAULT: '#0277FF',
          foreground: 'rgb(var(--color-link) / <alpha-value>)',
        },
        tbGray: {
          DEFAULT: '#A0A0A0',
          foreground: 'rgb(var(--color-placeholder) / <alpha-value>)',
        },
        tbRed: {
          DEFAULT: '#F45858',
          foreground: 'rgb(var(--color-invalid) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
}
export default config
