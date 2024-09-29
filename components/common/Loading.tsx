import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
interface LoadingProps {
  size?: number
}
const Loading = ({ size }: LoadingProps): ReactNode => {
  return <LucideIcon name='LoaderCircle' className='animate-spin' size={size || 16} />
}

export default Loading
