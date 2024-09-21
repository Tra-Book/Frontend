import { differenceInDays, parse } from 'date-fns'
import { format } from 'date-fns/format'
import { ko } from 'date-fns/locale'

export const formatToHyphenDate = (date: Date): string => format(date, 'yyyy-MM-dd')

export const formatToKoreanShortDate = (date: Date) => format(date, 'yyyy년 M월', { locale: ko })

export const parseHypenDateToDate = (dateString: string) => parse(dateString, 'yyyy-MM-dd', new Date())

//"yyyy.MM.dd(요일)" 형태로 반환
export const formatKoreanDate = (date: Date): string => {
  const dayOfWeekMap = ['일', '월', '화', '수', '목', '금', '토']
  const formattedDate = format(date, 'yyyy.MM.dd', { locale: ko })
  const dayOfWeek = dayOfWeekMap[date.getDay()]

  return `${formattedDate}(${dayOfWeek})`
}

// 1박 2일 형태
export const calculateTripDuration = (startDate: Date, endDate: Date): string => {
  const totalDays = differenceInDays(endDate, startDate) + 1
  const nights = totalDays - 1

  return `${nights}박 ${totalDays}일`
}
