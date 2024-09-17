import { format } from 'date-fns/format'
import { ko } from 'date-fns/locale'

export const formatToHyphenDate = (date: Date): string => format(date, 'yyyy-MM-dd')

export const formatToKoreanShortDate = (date: Date) => format(date, 'yyyy년 M월', { locale: ko })
