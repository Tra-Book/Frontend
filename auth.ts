import NextAuth from 'next-auth'
import google from 'next-auth/providers/google'
import kakao from 'next-auth/providers/kakao'
import naver from 'next-auth/providers/naver'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT || 'GOOGLE_CLIENT',
      clientSecret: process.env.GOOGLE_SECRET || 'GOOGLE_SECRET',
      authorization: {
        params: {
          prompt: 'consent', // 사용자에게 항상 동의 화면을 표시하도록 강제!
        },
      },
    }),
    kakao({
      clientId: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API || 'KAKAO_CLIENT',
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || 'KAKAO_SECRET',
    }),
    naver({
      clientId: process.env.NAVER_CLIENT || 'NAVER_CLIENT',
      clientSecret: process.env.NAVER_SECRET || 'NAVER_SECRET',
    }),
  ],
  callbacks: {
    // 로그인 시도했을 때 호출, 로그인 실패와 성공 구분하기
    // 소셜 로그인인 경우에 토큰 받아오는 로직 추가 (Credential은 위에서 직접 처리)
    signIn: async ({ user, account }: { user: any; account: any }) => {
      console.log('account', account)
      console.log('user', user)

      // Kakao Login API : /auth/kakao
      if (account?.provider === 'kakao') {
        console.log('Login with kakao')

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/kakao`, {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              access_token: account.access_token,
            }),
          })

          const status = res.status
          const data = await res.json()

          console.log(data)

          switch (status) {
            case 200:
            case 201:
              // 리프레시 토큰 -> 쿠키
              // cookies().set('refreshToken', 'refreshToken')

              // 헤더 -> accesstoken -> 세션에 저장
              user.accessToken = res.headers.get('Authorization')
              break
            case 400:
              console.log(data.message)
              return 'error'
              break
            default:
              console.log('kakao login error')
              return 'error'
          }
        } catch (error) {
          console.log(error)
          return 'error'
        }
      }
      // Google Login API : /auth/google
      if (account?.provider === 'google') {
        console.log('Login with google')

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/google`, {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              access_token: account.access_token,
            }),
          })

          const status = res.status
          const data = await res.json()

          console.log(data)

          switch (status) {
            case 200:
            case 201:
              // 리프레시 토큰 -> 쿠키
              // cookies().set('refreshToken', 'refreshToken')

              // 헤더 -> accesstoken -> 세션에 저장
              user.accessToken = res.headers.get('Authorization')
              break
            case 400:
              console.log(data.message)
              return 'error'
              break
            default:
              console.log('kakao login error')
              return 'error'
          }
        } catch (error) {
          console.log(error)
          return 'error'
        }
      }

      // cookies().set('refreshToken', 'refreshToken')
      // user.accessToken = 'accessToken'

      return true
    },
    redirect: async ({ url, baseUrl }) => {
      // Login fail
      if (url === 'error') {
        return `${baseUrl}/login/error`
      }

      return `${baseUrl}/`
    },
    // 세션에 토큰 저장하는 과정...
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.accessToken = user.accessToken
      }

      console.log('jwt', token)

      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.accessToken = token.accessToken
      console.log('session', session)

      return session
    },
  },
})
