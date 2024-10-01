import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import { colorSet, ColorType } from '@/public/colors/colors'

interface BackdropProps {
  className?: string
  color?: ColorType // 백드롭 색상
  opacity?: string // 투명도 지정 옵션
  children?: React.ReactNode
}

const Backdrop = ({ className, color = 'tbGray', children }: BackdropProps): ReactNode => {
  const colorValue = colorSet[color]
  return (
    <div
      className={cn(
        'absolute inset-0 z-10 flex items-center justify-center text-xl font-semibold text-black',
        className,
      )}
      style={{
        backgroundColor: colorValue,
      }}
    >
      {children}
    </div>
  )
}

export default Backdrop
