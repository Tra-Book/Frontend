'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BACKEND_ROUTES, ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { UserInfo } from '@/lib/types/Session'
import ProfileImage from '@/public/dummy/dummy_profile_image.png'

function validateNickname(nickname: string) {
  // 정규 표현식: 영문자, 한글, 숫자만 허용
  const regex = /^[a-zA-Z가-힣0-9]+$/

  return regex.test(nickname)
}

interface ProfileChangeProps {
  session: UserInfo
}

function validateProfileMessage(message: string): boolean {
  const maxLength = 30

  // 허용할 문자 (영문, 한글, 숫자, 기본 특수 문자)
  const allowedCharacters = /^[a-zA-Z0-9가-힣\s.,!?()&-~]*$/

  if (message.length > maxLength || !allowedCharacters.test(message)) {
    return false
  }

  return true
}

const ProfileChange = ({ session }: ProfileChangeProps): ReactNode => {
  const [nickname, setNickname] = useState<string>(session.nickname)
  const [message, setMessage] = useState<string>(session.status_message || '')
  const [image, setImage] = useState<File | string | undefined>()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const { update } = useSession()
  console.log(session)

  // console.log(session)

  const onClickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onClickButton = async () => {
    // 닉네임 validation
    const username: string = nickname.trim()
    if (username.length < 2) {
      alert('닉네임은 두 글자 이상이어야 합니다.')
      return
    }
    if (!validateNickname(username)) {
      alert('닉네임은 영문자, 한글, 숫자만 사용 가능합니다.')
      return
    }
    if (!validateProfileMessage(message)) {
      alert('프로필 메세지는 20자 이하, 영문, 한글, 숫자, 기본 특수 문자만 사용 가능합니다.')
      return
    }

    const formData = new FormData()
    if (image) {
      //image change
      formData.append('image', image)
    } else {
      // image not change, original url
      session.image && formData.append('imageUrl', session.image)
    }
    formData.append('username', nickname)
    formData.append('statusMessage', message)

    try {
      const res = await fetch(`/server/${BACKEND_ROUTES.AUTH.UPDATE_PROFILE.url}`, {
        method: BACKEND_ROUTES.AUTH.UPDATE_PROFILE.method,
        headers: {
          Authorization: session.accessToken,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
        credentials: 'include',
      })

      const status = res.status
      const data = await res.json()
      console.log(data)

      switch (status) {
        case 200:
          update({ nickname: nickname, status_message: message, image: data.profilePhoto })
          alert('변경이 완료되었습니다.')
          return
        case 500:
          alert('다시 시도해주세요.')
          break
        default:
          break
      }
    } catch (error) {
      alert('프로필 변경이 실패하였습니다.')
    }
  }

  return (
    <div className='relative flex w-full flex-col bg-white px-10'>
      <div className='flex w-full flex-col items-start justify-end gap-4'>
        <span className='flex h-[8dvh] min-h-[60px] items-end text-2xl font-semibold xl:text-3xl'>내 정보 관리</span>
        <span className='border-b border-solid border-black text-sm font-medium xl:text-base'>프로필 수정</span>
      </div>

      <div className='grow md:flex md:w-2/3'>
        <div className='mt-10 flex grow flex-col items-center'>
          <Label htmlFor='image' className='hover:cursor-pointer'>
            <Image
              alt='프로필 이미지'
              src={previewUrl || session.image || ProfileImage}
              className='aspect-square h-[120px] w-[120px] rounded-full lg:h-[150px] lg:w-[150px]'
              width={150}
              height={150}
            />
            <div className='mt-2 text-center text-base'>프로필 사진</div>
          </Label>
          <Input id='image' type='file' className='hidden' onChange={onClickImage} />
        </div>

        <div className='mt-9 flex grow flex-col items-center gap-8'>
          <div className='flex w-full max-w-[300px] flex-col'>
            <Label htmlFor='nickname' className='mb-2 flex text-base'>
              닉네임 <span className='text-tbRed'>*</span>
            </Label>
            <Input
              onChange={e => setNickname(e.target.value)}
              className='h-13'
              placeholder={session.nickname}
              id='nickname'
              type='text'
              value={nickname}
            />
          </div>

          <div className='w-full max-w-[300px]'>
            <Label htmlFor='email' className='mb-2 flex items-center text-base'>
              이메일 <LucideIcon name='Info' className='ml-2' id='email' />
            </Label>
            <Input className='h-13' placeholder={session.email} disabled />
          </div>

          <div className='flex w-full max-w-[300px] flex-col'>
            <Label htmlFor='message' className='mb-2 text-base'>
              상태 메세지 <span className='text-tbRed'>*</span>
            </Label>
            <Input
              onChange={e => setMessage(e.target.value)}
              className='h-13'
              placeholder={session.status_message}
              id='message'
              type='text'
              value={message}
            />
          </div>

          <Button onClick={onClickButton} variant='tbPrimary' className='mt-3 h-13 w-full max-w-[300px]'>
            프로필 저장
          </Button>
        </div>
      </div>

      <div className='my-3 flex flex-col text-center text-sm text-[#817A7A] md:block'>
        더 이상 TRABOOK과 함께하고 싶지 않으신가요?
        <Link href={ROUTES.AUTH.SIGNOUT.url} className='mx-5 text-black underline hover:cursor-pointer'>
          회원 탈퇴
        </Link>
      </div>
    </div>
  )
}

export default ProfileChange
