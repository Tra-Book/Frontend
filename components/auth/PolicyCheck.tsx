'use client'

import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import { Checkbox } from '@/components/ui/checkbox'

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

  // useEffect
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
    <div className='w-5/6 text-lg'>
      <div className='h mb-6 text-center'>
        TrabBook에 오신걸 환영합니다!
        <br />
        서비스를 이용하기 위한 약관 동의를 해주세요.
      </div>
      <div>
        <div className='text-xl font-semibold'>
          <Checkbox
            id='allTerms'
            className='border-tbGray data-[state=checked]:bg-tbSecondary data-[state=checked]:text-tbPrimary'
            checked={isAllChecked}
            onClick={onClickAllCheck}
          />
          <label
            htmlFor='allTerms'
            className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            &nbsp;전체 동의
          </label>
        </div>

        {POLICIES.map((policy, index) => (
          <div key={policy.link} className='my-3'>
            <Checkbox
              id={policy.link}
              className='border-tbGray data-[state=checked]:bg-tbSecondary data-[state=checked]:text-tbPrimary'
              checked={isCheckedList[index]}
              onClick={() => onClickCheckBox(index)}
            />
            <label
              htmlFor={policy.link}
              className='text-l font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              &nbsp;{policy.required ? '(필수)' : '(선택)'}&nbsp;{policy.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PolicyCheck
