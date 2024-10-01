import Link from 'next/link'
import React, { ReactNode } from 'react'

import { ROUTES } from '@/lib/constants/routes'
import { cn } from '@/lib/utils/cn'

interface EmailLinkProps {
  className?: string
}

const EmailLink = ({ className }: EmailLinkProps): ReactNode => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 ssm:flex-row', className)}>
      <p className='text-tbGray'>계정이 없으신가요?</p>
      <Link className='text-black underline hover:text-tbBlue' href={ROUTES.AUTH.SIGNUP.url}>
        이메일로 회원가입
      </Link>
    </div>
  )
}

export default EmailLink
