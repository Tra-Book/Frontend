import { differenceInDays, parse } from 'date-fns'
import { format } from 'date-fns/format'
import { ko } from 'date-fns/locale'

export const formatDateToHyphenDate = (date: Date): string => format(date, 'yyyy-MM-dd')

export const formatToKoreanShortDate = (date: Date): string => format(date, 'MM/dd(E)', { locale: ko })

export const parseHypenDateToDate = (dateString: string): Date => parse(dateString, 'yyyy-MM-dd', new Date())

//"yyyy.MM.dd(요일)" 형태로 반환
export const formatKoreanDate = (date: Date): string => {
  if (typeof date === 'object') {
    const dayOfWeekMap = ['일', '월', '화', '수', '목', '금', '토']
    const formattedDate = format(date, 'yyyy.MM.dd', { locale: ko })
    const dayOfWeek = dayOfWeekMap[date.getDay()]

    return `${formattedDate}(${dayOfWeek})`
  }
  console.log(date)

  console.log('date is not Date', typeof date)

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

  const millisecondsInOneHour = 1000 * 60 * 60 // 1시간 = 3600000 밀리초
  const millisecondsInOneDay = millisecondsInOneHour * 24 // 1일 = 86400000 밀리초

  if (timeDiff < millisecondsInOneDay) {
    // 24시간이 지나지 않은 경우
    const hoursDifference = Math.floor(timeDiff / millisecondsInOneHour)
    return `${hoursDifference}시간 전`
  } else {
    // 24시간이 지난 경우
    const daysDifference = Math.floor(timeDiff / millisecondsInOneDay)
    return `${daysDifference}일 전`
  }
}
