import { icons } from 'lucide-react'
import { HTMLAttributes } from 'react'

import { colorSet, ColorType } from '@/public/colors/colors'

import { cn } from '../utils/cn'

export interface LucideIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons
  color?: ColorType
  size?: number
  className?: string
  fill?: ColorType
  strokeWidth?: number
}

const LucideIcon = ({ name, color, strokeWidth = 2, size = 16, fill, className, ...props }: LucideIconProps) => {
  const LucideIcon = icons[name]

  const isClickEvent = !!props.onClick
  const pointerStyle = isClickEvent ? 'cursor-pointer' : ''

  return (
    <LucideIcon
      color={color && colorSet[color]}
      size={size}
      fill={fill ? colorSet[fill] : 'transparent'}
      strokeWidth={strokeWidth}
      className={cn(pointerStyle, className)}
      {...props}
    />
  )
}

export default LucideIcon
