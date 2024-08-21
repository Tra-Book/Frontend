import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface SloganProps {
  titleClassName?: string
  subTitleClassName?: string
}

export const SERVICE_NAME = 'TRABOOK'
export const SLOGANS = ['DREAM', 'PLAN', 'TRAVEL']

const Slogan = ({ titleClassName, subTitleClassName }: SloganProps): ReactNode => {
  return (
    <div className='flex flex-col items-center'>
      <p className={cn('font-mono text-4xl font-bold', titleClassName)}>{SERVICE_NAME}</p>
      <p className={cn('text-base', subTitleClassName)}>{SLOGANS.join(' ')}</p>
    </div>
  )
}

export default Slogan
