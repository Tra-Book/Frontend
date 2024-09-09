export interface UserInfo {
  email: string
  accessToken: string
  provider: 'credentials' | 'kakao' | 'google' | 'naver'
  status_message: string | undefined
  image: string | undefined
  nickname: string
}
