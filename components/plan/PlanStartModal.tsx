import React, { ReactNode } from 'react'

interface PlanStartModalProps {}

const PlanStartModal = ({}: PlanStartModalProps): ReactNode => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='flex h-1/2 w-1/2 flex-col rounded bg-white'>PlanStartModal</div>
    </div>
  )
}

export default PlanStartModal
