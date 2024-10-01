import React, { ReactNode } from 'react'

import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'

interface PasswordFindLinkProps {
  className?: string
}

const PasswordFindLink = ({ className }: PasswordFindLinkProps): ReactNode => {
  const { modalData, handleModalStates, Modal } = useModal()
  const openModal = () => {
    handleModalStates(
      {
        id: 'info',
        title: '비밀번호 찾기',
        description: '서비스 준비 중입니다.\nTraBook 이메일로 문의해주세요.',
        isError: false,
      },
      'open',
    )
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 ssm:flex-row', className)}>
      <p className='text-tbGray'>비밀번호를 잊으셨나요?</p>
      {/* <Link className='text-black underline hover:text-tbBlue' href={ROUTES.AUTH.SIGNUP.url}>
        비밀번호 찾기
      </Link> */}
      <div className='text-black underline hover:text-tbBlue' onClick={openModal}>
        비밀번호 찾기
      </div>
      <Modal onConfirm={() => {}} />
    </div>
  )
}

export default PasswordFindLink
