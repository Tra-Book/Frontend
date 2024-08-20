import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      width: {
        '102': '28rem',
      },
      height: {
        '13': '3.25rem',
      },
      colors: {
        basic: '#FFD25E',
        naver: '#03C75A',
        kakao: '#FEE500',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
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
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
