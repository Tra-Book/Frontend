import React, { ReactNode } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserInfoCheckProps {}

const UserInfoCheck = ({}: UserInfoCheckProps): ReactNode => {
  return (
    <>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2'>
          닉네임 *
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='email' id='email' placeholder='' className='h-11' />
        </div>
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2'>
          비밀번호 *
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='password' id='password' placeholder='' className='h-11' />
        </div>
      </div>
      <div className='mt-2 text-center text-slate-500'>
        안전한 비밀번호를 위해
        <br />
        영문자, 숫자, 특수문자를 포함해야 합니다.
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2'>
          비밀번호 확인 *
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='password' id='password' placeholder='' className='h-11' />
        </div>
      </div>
    </>
  )
}

export default UserInfoCheck
