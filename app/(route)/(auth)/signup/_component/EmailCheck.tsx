import React, { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface EmailCheckProps {}

const EmailCheck = ({}: EmailCheckProps): ReactNode => {
  return (
    <>
      {/* <div className='flex flex-col items-center gap-7'> */}
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2'>
          이메일 *
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='email' id='email' placeholder='' className='h-11' />
          <Button variant='secondary' className='hover:bg-slate-30 h-11 bg-slate-200'>
            전송
          </Button>
        </div>
      </div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor='email' className='mb-2'>
          인증번호 *
        </Label>
        <div className='gap flex justify-between gap-2'>
          <Input type='password' id='password' placeholder='' className='h-11' />
          <Button variant='secondary' className='hover:bg-slate-30 h-11 bg-slate-200'>
            확인
          </Button>
        </div>
      </div>
      <div className='mt-2 text-center text-slate-500'>
        혹시 메일을 받지 못하셨다면
        <br />
        아래 재전송 버튼을 클릭해주세요
      </div>
      <Button variant='secondary' className='mt-2 h-11 w-full max-w-sm bg-slate-200 hover:bg-slate-300'>
        인증번호 재전송
      </Button>
      {/* </div> */}
    </>
  )
}

export default EmailCheck
