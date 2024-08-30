import React, { ReactNode } from 'react'

import { Button, ButtonVariantKeyOptions } from './button'

interface IconButtonProps {
  className?: string
  variant?: ButtonVariantKeyOptions
  text: string
  Icon: JSX.Element
  children: React.ReactNode
}

const IconButton = ({ className, variant = 'default', text, Icon }: IconButtonProps): ReactNode => {
  return (
    <Button variant={variant} className={className}>
      {text}
      {Icon}
    </Button>
  )
}

export default IconButton
