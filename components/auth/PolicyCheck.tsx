'use client'

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import LucideIcon from '@/lib/icons/LucideIcon'

interface PolicyCheckProps {
  setIsNext: Dispatch<SetStateAction<boolean>>
}

type Policy = {
  required: boolean
  text: string
  link: string
}

const POLICIES: Array<Policy> = [
  {
    required: true,
    text: '이용약관',
    link: '이용약관',
  },
  {
    required: true,
    text: '개인정보 수집 및 이용 동의',
    link: '개인정보 수집 및 이용 동의',
  },
  {
    required: false,
    text: '위치기반 서비스 이용약관 동의',
    link: '위치기반 서비스 이용약관 동의',
  },
  {
    required: false,
    text: '마케팅 동의',
    link: '마케팅 동의',
  },
]

const PolicyCheck = ({ setIsNext }: PolicyCheckProps): ReactNode => {
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false)
  const [isCheckedList, setIsCheckedList] = useState<Array<boolean>>(POLICIES.map(() => false))

  const onClickAllCheck = () => {
    // 모두 체크 되어 있다 -> 모두 체크 해제
    // 그 외 -> 모두 체크
    if (isCheckedList.every(state => state === true)) {
      setIsCheckedList(isCheckedList.map(() => false))
    } else {
      setIsCheckedList(isCheckedList.map(() => true))
    }
  }

  const onClickCheckBox = (index: number): void => {
    const newCheckedList = isCheckedList.map((checked, i) => (i === index ? !checked : checked))
    setIsCheckedList(newCheckedList)
  }

  // 1. 다음 버튼 활성화
  // 2. 전체 동의 자동 체크
  useEffect(() => {
    const isNext = isCheckedList.every((state, i) => {
      if (POLICIES[i].required === true) {
        if (state === true) return true
        if (state === false) return false
      } else {
        return true
      }
    })
    setIsNext(isNext)

    if (isCheckedList.every(state => state === true)) {
      setIsAllChecked(true)
    } else {
      setIsAllChecked(false)
    }
  }, [isCheckedList])

  return (
    <div className='flex w-full flex-col items-center justify-center text-lg'>
      <div className='mb-6 max-w-sm text-center text-xl leading-9'>
        <div>
          TrabBook에 오신걸 환영합니다!
          <br />
          서비스를 이용하기 위한 약관 동의를 해주세요.
        </div>
      </div>
      <div className='flex max-w-md flex-col justify-center'>
        <div className='mt-3 flex h-13 items-start font-semibold'>
          <Checkbox
            id='allTerms'
            className='h-5 w-5 border-tbGray data-[state=checked]:bg-tbSecondary data-[state=checked]:text-tbPrimary'
            checked={isAllChecked}
            onClick={onClickAllCheck}
          />
          <label
            htmlFor='allTerms'
            className='pl-2 text-xl font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            전체 동의
          </label>
        </div>

        {POLICIES.map((policy, index) => (
          <div key={policy.link} className='flex h-13 items-start'>
            <Checkbox
              id={policy.link}
              className='h-5 w-5 border-tbGray data-[state=checked]:bg-tbSecondary data-[state=checked]:text-tbPrimary'
              checked={isCheckedList[index]}
              onClick={() => onClickCheckBox(index)}
            />
            <label
              htmlFor={policy.link}
              className='grow pl-2 text-lg font-normal leading-5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {policy.required ? '(필수)' : '(선택)'}&nbsp;{policy.text}
            </label>
            <LucideIcon name='ChevronRight' className='right-0 ml-4 h-5 w-5' onClick={() => true} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PolicyCheck
