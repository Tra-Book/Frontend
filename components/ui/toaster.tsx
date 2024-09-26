'use client'

import { ReactNode } from 'react'

import { Toast, ToastClose, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast'
import { useToast } from '@/lib/utils/hooks/useToast'

export function Toaster(): ReactNode {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} duration={2000}>
            <div className='grid gap-1'>{title && <ToastTitle>{title}</ToastTitle>}</div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
