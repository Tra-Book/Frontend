import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'

interface MapPinProps {
  num: number
  size?: number
  className?: string
}

const MapPin = ({ num, size, className }: MapPinProps) => {
  return (
    <div className={cn('relative h-fit w-fit', className)}>
      <LucideIcon size={size} name='MapPin' fill='tbOrange' strokeWidth={0} className='origin-bottom' />
      <span className='group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs'>{num}</span>
    </div>
  )
}

export default MapPin
