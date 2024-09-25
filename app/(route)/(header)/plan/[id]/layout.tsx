import { ToastProvider } from '@radix-ui/react-toast'

import { Toaster } from '@/components/ui/toaster'

export default function PlanDetailsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='justiy-start flex h-min min-h-screen-header w-full flex-col items-center pt-24'>
      <ToastProvider>
        {children}
        <Toaster />
      </ToastProvider>
    </div>
  )
}
