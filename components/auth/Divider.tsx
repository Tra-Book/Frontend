import React, { ReactNode } from 'react'

interface DividerProps {
  text: string
}

const Divider = ({ text }: DividerProps): ReactNode => {
  return (
    <>
      <div className='flex-grow border-t border-tbGray' />
      <span className='px-4 text-tbGray'>{text}</span>
      <div className='flex-grow border-t border-tbGray' />
    </>
  )
}

export default Divider
