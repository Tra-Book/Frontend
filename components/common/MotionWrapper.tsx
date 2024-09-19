'use client'

import { motion, MotionProps } from 'framer-motion'
import React from 'react'

import { AnimationKey, partialAnimation } from '@/lib/types/animation'

interface CustomMotionProps<Tag extends keyof JSX.IntrinsicElements> extends MotionProps {
  tag?: Tag
  children: React.ReactNode
  className?: string
  animation: partialAnimation
}

export const Motion = <Tag extends keyof JSX.IntrinsicElements>({
  tag,
  children,
  className,
  animation,
  ...props
}: CustomMotionProps<Tag>) => {
  const Comp = tag ? (motion as any)[tag] : motion.div

  const animationKeys: AnimationKey[] = ['initial', 'animate', 'transition', 'whileInView', 'viewport']
  const animationProps = animationKeys.reduce((acc, key) => {
    if (animation && animation[key]) {
      acc[key] = animation[key]
    }
    return acc
  }, {} as MotionProps)
  return (
    <Comp className={className} {...props} {...animationProps}>
      {children}
    </Comp>
  )
}
