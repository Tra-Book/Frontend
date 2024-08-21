import { Mada, McLaren } from 'next/font/google'
import localFont from 'next/font/local'

export const mada = Mada({ weight: '700', subsets: ['latin'], variable: '--font-mada' })
export const mcLaren = McLaren({ weight: '400', subsets: ['latin'], variable: '--font-mclaren' })

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  weight: '45 920',
  variable: '--font-pretendard',
})
