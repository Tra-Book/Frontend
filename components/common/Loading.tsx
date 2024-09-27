import React, { ReactNode } from 'react'

import LucideIcon from '@/lib/icons/LucideIcon'
interface LoadingProps {}
const Loading = ({}: LoadingProps): ReactNode => {
  return <LucideIcon name='LoaderCircle' className='animate-spin' size={24} />
}

export default Loading
