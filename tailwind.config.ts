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
      screens: {
        ssm: '400px',
      },
      flexGrow: {
        2: '2',
        3: '3',
      },
      width: {
        '102': '28rem',
      },
      height: {
        '13': '3.25rem',
        'screen-header': 'calc(100dvh - 6rem)',
      },
      minHeight: {
        'screen-header': 'calc(100dvh - 6rem)',
      },
      colors: {
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
        // TraBook 색
        tbPrimary: '#FFD25E',
        tbPrimaryHover: '#FFC52F',

        tbSecondary: '#FFEFCA',
        tbSecondaryHover: '#FEE19E',

        tbGreen: '#A3D184',
        tbGreenHover: '#ABDD8A',

        tbBlue: '#0277FF',
        tbBlueHover: '#0051FF',

        tbPlaceholder: '#EBEBEB',
        tbPlaceHolderHover: '#DEDEDE',

        tbBackdrop: '#00000033',
        tbGray: '#00000080',
        tbRed: '#F45858',
        tbOrange: '#FF8710',
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
        mclaren: ['var(--font-mclaren)'],
        mada: ['var(--font-mada)'],
      },
      boxShadow: {
        'tb-shadow': '0px 0px 3px 0px rgba(0, 0, 0, 0.08), 0px 2px 3px 0px rgba(0, 0, 0, 0.17)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
} satisfies Config

export default config
