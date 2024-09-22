import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/cn'

export const variant = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline',
  // Social Login
  naver: 'bg-[#03C75A] text-white hover:bg-[#00C13A]',
  kakao: 'bg-[#FEE500] text-black hover:bg-[#FBDA00]',
  google: 'bg-white text-black hover:bg-[#F5F5F5]',
  // TraBook Custom Buttons
  tbPrimary: 'bg-tbPrimary text-black hover:bg-tbPrimaryHover',
  tbSecondary: 'bg-tbSecondary hover:bg-tbSecondaryHover',
  tbGreen: 'bg-tbGreen hover:bg-tbGreenHover',
  tbGray: 'text-tbGray border-none bg-tbPlaceholder hover:text-black hover:border-black',
}

const buttonVariants = cva(
  'shadow-tb-shadow inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: variant,
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

/**
 * Button 컴포넌트의 Variant Key 값을 모아둔 Type입니다.
 */
export type ButtonVariantKeyOptions = keyof typeof variant

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
