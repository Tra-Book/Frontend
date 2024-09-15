import LucideIcon from '@/lib/icons/LucideIcon'

interface MapPinProps {
  num: number
  size?: number
}

const MapPin = ({ num, size }: MapPinProps) => {
  return (
    <div className='relative h-fit w-fit'>
      <LucideIcon size={size} name='MapPin' fill='tbOrange' strokeWidth={0} />
      <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs'>{num}</span>
    </div>
  )
}

export default MapPin
