'use client'
import React, { CSSProperties, ReactNode, RefObject, useEffect, useRef, useState } from 'react'

import { cn } from '../cn'

/**
 *  드롭다운 열고 닫기 제어하는 커스텀 훅
 */
export function useDropdown(): {
  ref: RefObject<HTMLDivElement>
  isOpen: boolean
  toggleDropdown: () => void
} {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const toggleDropdown = () => setIsOpen(prev => !prev)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside) // 정리
    }
  }, [ref])

  return { ref, isOpen, toggleDropdown }
}

/**
 * 드롭다운 적용할 Element에 적용할 Wrapper
 */
interface ToggleWrapperProps {
  ref: React.RefObject<HTMLDivElement>
  isOpen: boolean // 드롭다운이 열렸는지 여부
  children: ReactNode
  style?: CSSProperties // Optional style prop
  className?: string
}

const ToggleWrapper = React.forwardRef<HTMLDivElement, ToggleWrapperProps>(
  ({ children, className, isOpen, style }, ref) => {
    if (!isOpen) return null

    return (
      <div className={cn('absolute z-10', className)} ref={ref} style={style}>
        {children}
      </div>
    )
  },
)

ToggleWrapper.displayName = 'ToggleWrapper' // forwardRef 사용 시 displayName 설정

export default ToggleWrapper
