import { differenceInDays, parse } from 'date-fns'
import { format } from 'date-fns/format'
import { ko } from 'date-fns/locale'

export const formatDateToHyphenDate = (date: Date): string => format(date, 'yyyy-MM-dd')
export const formatDateToShortHyphenDate = (date: Date): string => format(date, 'yy.MM.dd')

export const formatToKoreanShortDateDay = (date: Date): string => format(date, 'MM/dd(E)', { locale: ko })
export const formatToKoreanShortDate = (date: Date) => format(date, 'yyyy년 M월', { locale: ko })

export const parseHypenDateToDate = (dateString: string): Date => parse(dateString, 'yyyy-MM-dd', new Date())

//"yyyy.MM.dd(요일)" 형태로 반환
export const formatKoreanDate = (date: Date): string => {
  if (typeof date === 'object') {
    const dayOfWeekMap = ['일', '월', '화', '수', '목', '금', '토']
    const formattedDate = format(date, 'yyyy.MM.dd', { locale: ko })
    const dayOfWeek = dayOfWeekMap[date.getDay()]

    return `${formattedDate}(${dayOfWeek})`
  }
  return ''
}

export const formatShortKoreanDate = (date: Date): string => {
  return format(date, 'MM/dd(E)', { locale: ko })
}
export const getTripDuration = (startDate: Date, endDate: Date): number => {
  return differenceInDays(endDate, startDate) + 1
}

// 1박 2일 형태
export const calculateTripDuration = (startDate: Date, endDate: Date): string => {
  const totalDays = differenceInDays(endDate, startDate) + 1
  const nights = totalDays - 1

  return `${nights}박 ${totalDays}일`
}

/**
 * 남은 시간을 "HH:MM" 형태로 반환하는 함수
 * @param startTime 시작시간 ("HH:MM")
 * @param endTime 종료시간 ("HH:MM")
 * @param durations duration 배열 (minutes)
 */
export const calculateLeftTIme = (startTime: string, endTime: string, durations: Array<number>) => {
  // #1. 중간 시간
  const [endHour, endMin] = endTime.split(':').map(Number)
  const [startHour, startMin] = startTime.split(':').map(Number)

  let totalMinutes = endHour * 60 - endMin - startHour * 60 - startMin

  // #2. durations 뺴기
  durations.forEach(duration => (totalMinutes -= duration))

  const [hour, min] = [Math.floor(totalMinutes / 60), totalMinutes % 60]
  // #3. 두 자리 문자열로 포맷팅
  const formattedHour = String(hour).padStart(2, '0')
  const formattedMin = String(min).padStart(2, '0')

  return `${formattedHour}:${formattedMin}`
}
/**
 * 24H 미만: "HH시간"
 * 24H 이상: "D일"
 * @param date 타겟 시간입니다
 * @returns 현재 시간과의 차이를 문자열로 나타냅니다
 */
export const getRelativeTimeString = (date: Date): string => {
  const now: Date = new Date() // 현재 시간
  const timeDiff: number = now.getTime() - date.getTime() // 시간 차이 (밀리초 단위)

  const msInOneMin = 1000 * 60 // 1분: 60초 * 1000ms
  const msInOneHour = msInOneMin * 60 // 1시간 = 60분
  const msInOneDay = msInOneHour * 24 // 1일 = 24시간

  if (timeDiff < msInOneHour) {
    const minutesDifference = Math.floor(timeDiff / msInOneMin)
    return `${minutesDifference}분 전`
  }
  if (timeDiff < msInOneDay) {
    // 24시간이 지나지 않은 경우
    const hoursDifference = Math.floor(timeDiff / msInOneHour)
    return `${hoursDifference}시간 전`
  } else {
    // 24시간이 지난 경우
    const daysDifference = Math.floor(timeDiff / msInOneDay)
    return `${daysDifference}일 전`
  }
}

/**
 * x분 > "x일x시간x분" 포맷바꾸기
 */
export const formatDurationTime = (minutes: number): string => {
  const days = Math.floor(minutes / (24 * 60)) // 1일 = 1440분
  const hours = Math.floor((minutes % (24 * 60)) / 60) // 나머지에서 시간 계산
  const mins = minutes % 60 // 나머지 분 계산

  let result = ''

  if (days > 0) {
    result += `${days}일 `
  }

  if (hours > 0) {
    result += `${hours}시간 `
  }

  // 분이 0이 아닌 경우에만 추가
  if (mins > 0) {
    result += `${mins}분`
  }

  return result.trim() // 앞뒤 공백 제거
}
