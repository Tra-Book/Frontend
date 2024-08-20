import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface SloganProps {
  titleClassName?: string
  subTitleClassName?: string
}

const Slogan = ({ titleClassName, subTitleClassName }: SloganProps): ReactNode => {
  return (
    <div className='flex flex-col items-center'>
      <p className={cn('font-mono text-4xl font-bold', titleClassName)}>TRABOOK</p>
      <p className={cn('text-base', subTitleClassName)}>DREAM PLAN TRAVEL</p>
    </div>
  )
}

export default Slogan
