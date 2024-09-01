import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'

interface TextDividerProps {
  text?: string
}

export const TextDivider = ({ text }: TextDividerProps): ReactNode => {
  return (
    <>
      <div className='flex-grow border-t border-tbGray' />
      <span className='px-4 text-tbGray'>{text}</span>
      <div className='flex-grow border-t border-tbGray' />
    </>
  )
}

export const Divider = (): ReactNode => {
  return <div className={cn('h-1 w-full bg-tbPlaceholder')} />
}
