'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import { TextDivider } from '@/components/common/Dividers'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ClientModalData } from '@/lib/constants/errors'
import { BACKEND_ROUTES } from '@/lib/constants/routes'
import useModal from '@/lib/utils/hooks/useModal'
import { useToast } from '@/lib/utils/hooks/useToast'

interface SignOutPageProps {}

const SignOutPage = ({}: SignOutPageProps): ReactNode => {
  const { modalData, handleModalStates, Modal } = useModal()
  const session: any = useSession()
  const router = useRouter()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { toast } = useToast()

  const signOut = async () => {
    if (!isChecked) {
      console.log('431')

      toast({ title: '주의사항에 동의해주세요.' })
      return
    }

    const url = BACKEND_ROUTES.AUTH.SIGNOUT
    try {
      const res = await fetch(`/server${url.url}`, {
        method: url.method,
        headers: {
          Authorization: session.data.accessToken,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const status = res.status
      if (res.ok) {
        handleModalStates(
          {
            id: 'info',
            title: '회원 탈퇴',
            description: '회원 탈퇴가 완료되었습니다.',
            isError: false,
          },
          'open',
        )

        return
      }
      switch (status) {
        default:
          handleModalStates(ClientModalData.serverError, 'open')
          return
      }
    } catch (error) {
      handleModalStates(ClientModalData.serverError, 'open')
    }
  }

  return (
    <div className='w-3/4 xl:w-3/5 2xl:w-1/2'>
      <div className='my-10 flex items-center justify-center'>
        <TextDivider text='회원탈퇴' />
      </div>
      <div className='flex flex-col items-center text-center text-lg'>
        <h1 className='mb-4 text-3xl'>TraBook과 함께했던</h1>
        <h1 className='mb-4 text-3xl'>소중한 여행 기록들을 간직해주세요!</h1>
        <ul className='max-w-[450px] list-disc text-start'>
          <li className='my-4'>서비스 이용 정보 (내 계힉, 보관함 등)은 모두 삭제됩니다.</li>
          <li className='my-4'>기록된 리뷰 및 댓글은 삭제되지 않습니다.</li>
          <li className='my-4'>회원가입 탈퇴 시 계정 정보는 영구 삭제됩니다.</li>
        </ul>
        <div className='my-6 flex max-w-[500px] items-center'>
          <Checkbox
            id='signup'
            className='h-5 w-5 border-tbGray data-[state=checked]:bg-tbSecondary data-[state=checked]:text-tbPrimary'
            checked={isChecked}
            onClick={() => setIsChecked(prev => !prev)}
          />
          <label
            htmlFor='signup'
            className='grow pl-2 text-lg font-normal leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            위 주의사항을 모두 숙제하였으며, 탈퇴에 동의합니다.
          </label>
        </div>
      </div>
      <div className='my-7 flex w-full gap-3'>
        <Button variant='tbRed' className='h-14 w-1/2 text-lg' onClick={signOut}>
          탈퇴하기
        </Button>
        <Button
          variant='tbPrimary'
          className='h-14 w-1/2 text-lg'
          onClick={() => {
            router.back()
          }}
        >
          함께하기
        </Button>
        <Modal
          onConfirm={() => {
            router.push('/')
          }}
        />
      </div>
    </div>
  )
}

export default SignOutPage
