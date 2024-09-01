import { icons } from 'lucide-react'
import { HTMLAttributes } from 'react'

import { colorSet, ColorType } from '@/public/colors/colors'

import { cn } from '../utils/cn'

export interface LucideIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: keyof typeof icons
  color?: ColorType
  size?: number
}

const LucideIcon = ({ name, color, size = 16, ...props }: LucideIconProps) => {
  const LucideIcon = icons[name]

  const isClickEvent = !!props.onClick
  const pointerStyle = isClickEvent ? 'cursor-pointer' : ''

  return (
    <LucideIcon color={color && colorSet[color]} size={size} className={cn(pointerStyle, props.className)} {...props} />
  )
}

export default LucideIcon
