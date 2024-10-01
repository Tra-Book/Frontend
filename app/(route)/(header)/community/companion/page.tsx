'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

import useModal from '@/lib/utils/hooks/useModal'

interface CompanionPageProps {}

const CompanionPage = ({}: CompanionPageProps): ReactNode => {
  const router = useRouter()
  const { modalData, handleModalStates, Modal } = useModal()

  useEffect(() => {
    handleModalStates(
      {
        id: 'info',
        title: '동행 구하기',
        description: '서비스 준비 중입니다.',
        isError: false,
      },
      'open',
    )
  }, [])

  return (
    <>
      <Modal
        onConfirm={() => {
          router.replace('/login')
        }}
      />
    </>
  )
}

export default CompanionPage
