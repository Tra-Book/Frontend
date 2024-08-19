import React, { ReactNode } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

interface PolicyCheckProps {}

const PolicyCheck = ({}: PolicyCheckProps): ReactNode => {
  return (
    <div className='w-5/6 text-lg'>
      <div className='h mb-6 text-center'>
        TrabBook에 오신걸 환영합니다!
        <br />
        서비스를 이용하기 위한 약관 동의를 해주세요.
      </div>
      <div>
        <div className='text-xl'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;전체 동의
          </label>
        </div>

        <div className='my-3 pl-9'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;(필수)&nbsp;이용약관
          </label>
        </div>
        <div className='my-3 pl-9'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;(필수)&nbsp;개인정보 수집 및 이용 동의
          </label>
        </div>
        <div className='my-3 pl-9'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;(선택)&nbsp;위치기반 서비스 이용약관 동의
          </label>
        </div>
        <div className='my-3 pl-9'>
          <Checkbox id='terms' />
          <label
            htmlFor='terms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;(선택)&nbsp;마케팅 동의
          </label>
        </div>
      </div>
    </div>
  )
}

export default PolicyCheck
