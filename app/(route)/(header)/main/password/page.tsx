'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React, { ChangeEventHandler, Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ClientModalData } from '@/lib/constants/errors'
import { BACKEND_ROUTES, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import useModal from '@/lib/utils/hooks/useModal'
import { useToast } from '@/lib/utils/hooks/useToast'

type PasswordState = {
  password: string
  isShow: boolean
}

function isValidPassword(password: string) {
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  const length = password.trim().length >= 10 ? true : false

  return hasLetter && hasNumber && hasSpecialChar && length
}

interface ChangePasswordPageProps {}

const ChangePasswordPage = ({}: ChangePasswordPageProps): ReactNode => {
  const session: any = useSession()
  const { toast } = useToast()
  const { modalData, handleModalStates, Modal } = useModal()

  const [currentPw, setCurrentPw] = useState<PasswordState>({ password: '', isShow: false })
  const [newPw, setNewPw] = useState<PasswordState>({ password: '', isShow: false })
  const [checkPw, setCheckPw] = useState<PasswordState>({ password: '', isShow: false })

  const [isValid, setIsValid] = useState<boolean>(true)
  const [isSame, setIsSame] = useState<boolean>(true)

  const onChangeNewPw: ChangeEventHandler<HTMLInputElement> = e => {
    setNewPw(prev => ({ ...prev, password: e.target.value }))

    if (isValidPassword(newPw.password)) setIsValid(true)
  }

  const onBlurNewPw: ChangeEventHandler<HTMLInputElement> = e => {
    if (isValidPassword(newPw.password)) setIsValid(true)
    else setIsValid(false)
  }

  const onChangeCheckPw: ChangeEventHandler<HTMLInputElement> = e => {
    setCheckPw(prev => ({ ...prev, password: e.target.value }))

    if (newPw.password === e.target.value) setIsSame(true)
    else setIsSame(false)
  }

  const onClickPwChange = async () => {
    // Todo: Red Error Text로 변경
    if (newPw.password.trim() === '') {
      alert('새 비밀번호를 입력해주세요.')
      return
    }
    if (!isValid) {
      alert('새 비밀번호 형식이 올바르지 않습니다.')
      return
    }
    if (!isSame) {
      alert('비밀번호 확인을 다시 입력해주세요.')
      return
    }

    try {
      const res = await fetch(`/server/${BACKEND_ROUTES.AUTH.UPDATE_PASSWORD.url}`, {
        method: BACKEND_ROUTES.AUTH.UPDATE_PASSWORD.method,
        headers: {
          Authorization: session.data.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: currentPw.password,
          newPassword: newPw.password,
        }),
        credentials: 'include',
      })

      const status = res.status
      if (res.ok) {
        toast({ title: '변경 내용 저장 완료!' })
        return
      }
      switch (status) {
        case 400:
          // Todo: 빨간 Error Text로 변경
          alert('현재 비밀번호가 다릅니다.')
          break
        case 500: // Internal Server Error
          handleModalStates(ClientModalData.serverError, 'open')
          break
      }
    } catch (error) {
      alert('비밀번호 변경 실패')
    }
  }

  const renderEye = (pw: PasswordState, setPw: Dispatch<SetStateAction<PasswordState>>) => {
    return (
      <LucideIcon
        name={!pw.isShow ? 'EyeOff' : 'Eye'}
        onClick={() => setPw(prev => ({ ...prev, isShow: !pw.isShow }))}
        className='absolute right-2 h-full opacity-40'
        size={24}
      />
    )
  }

  return (
    <div className='flex w-full flex-col bg-white px-10'>
      <div className='flex w-full flex-col items-start justify-end gap-4'>
        <span className='flex h-[8dvh] min-h-[60px] items-end text-2xl font-semibold xl:text-3xl'>내 정보 관리</span>
        <span className='border-b border-solid border-black text-sm font-medium xl:text-base'>비밀번호 변경</span>
      </div>

      <div className='mt-9 flex grow flex-col items-center gap-8'>
        <div className='flex w-full max-w-[300px] flex-col'>
          <Label htmlFor='currentPw' className='mb-2 flex text-base'>
            현재 비밀번호 <span className='text-tbRed'>*</span>
          </Label>
          <div className='gap relative flex justify-between gap-2'>
            <Input
              onChange={e => setCurrentPw(prev => ({ ...prev, password: e.target.value }))}
              type={currentPw.isShow ? 'text' : 'password'}
              id='currentPw'
              placeholder=''
              className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', false && 'ring-2 ring-tbRed')}
            />
            {renderEye(currentPw, setCurrentPw)}
          </div>
        </div>

        <div className='flex w-full max-w-[300px] flex-col'>
          <Label htmlFor='newPw' className='mb-2 flex text-base'>
            변경 비밀번호 <span className='text-tbRed'>*</span>
          </Label>
          <div className='gap relative flex justify-between gap-2'>
            <Input
              onChange={onChangeNewPw}
              onBlur={onBlurNewPw}
              type={newPw.isShow ? 'text' : 'password'}
              id='newPw'
              placeholder=''
              className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isValid && 'ring-2 ring-tbRed')}
            />
            {renderEye(newPw, setNewPw)}
          </div>
          <p className={cn(isValid ? 'invisible text-sm' : 'mt-1 pl-2 text-sm text-tbRed')}>
            * 올바른 형식이 아닙니다.
          </p>
        </div>

        <div className='text-center text-sm text-slate-500'>
          안전한 비밀번호를 위해
          <br />
          영문자, 숫자, 특수문자를 포함해야 합니다.
        </div>

        <div className='flex w-full max-w-[300px] flex-col'>
          <Label htmlFor='checkPw' className='mb-2 flex text-base'>
            비밀번호 확인<span className='text-tbRed'>*</span>
          </Label>
          <div className='gap relative flex justify-between gap-2'>
            <Input
              onChange={onChangeCheckPw}
              type={checkPw.isShow ? 'text' : 'password'}
              id='checkPw'
              placeholder=''
              className={cn('h-13 bg-tbPlaceholder shadow-tb-shadow', !isSame && 'ring-2 ring-tbRed')}
            />
            {renderEye(checkPw, setCheckPw)}
          </div>
          <p className={cn(isSame ? 'invisible text-sm' : 'mt-1 pl-2 text-sm text-tbRed')}>
            * 비밀번호를 확인해주세요.
          </p>
        </div>

        <Button onClick={onClickPwChange} variant='tbPrimary' className='mt-3 h-13 w-full max-w-[300px]'>
          비밀번호 변경
        </Button>
      </div>

      <div className='my-3 flex flex-col text-center text-sm text-[#817A7A] md:block'>
        더 이상 TRABOOK과 함께하고 싶지 않으신가요?
        <Link
          href={ROUTES.AUTH.SIGNOUT.url}
          className='mx-5 text-black underline hover:cursor-pointer hover:text-tbBlue'
        >
          회원 탈퇴
        </Link>
      </div>
    </div>
  )
}

export default ChangePasswordPage
