import NextAuth from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import google from 'next-auth/providers/google'
import kakao from 'next-auth/providers/kakao'
import naver from 'next-auth/providers/naver'

type LoginApiKey = {
  clientId: string
  clientSecret: string
}

const LOGIN_API_KEYS: { [key: string]: LoginApiKey } = {
  google: {
    clientId: process.env.GOOGLE_CLIENT || 'GOOGLE_CLIENT',
    clientSecret: process.env.GOOGLE_SECRET || 'GOOGLE_SECRET',
  },
  kakao: {
    clientId: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API || 'KAKAO_CLIENT',
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || 'KAKAO_SECRET',
  },
  naver: {
    clientId: process.env.NAVER_CLIENT || 'NAVER_CLIENT',
    clientSecret: process.env.NAVER_SECRET || 'NAVER_SECRET',
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      authorize: async credentials => {
        // console.log(credentials)

        credentials.email = credentials.username
        delete credentials.username

        return credentials
      },
    }),
    google(LOGIN_API_KEYS.google),
    kakao(LOGIN_API_KEYS.kakao),
    naver(LOGIN_API_KEYS.naver),
  ],
  callbacks: {
    signIn: async ({ user, account }: { user: any; account: any }) => {
      console.log('account', account)
      console.log('user', user)

      user.provider = account.provider

      if (account?.provider === 'credentials') {
        console.log('Login with credentials')

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
            credentials: 'include',
          })

          const status = res.status
          const data = await res.json()
          console.log(data, data)

          switch (status) {
            case 200:
              // `Set-Cookie` 헤더에서 쿠키를 가져옴
              // const setCookieHeader = res.headers.get('set-cookie')
              // console.log('Set-Cookie Header:', setCookieHeader)

              // // 원하는 쿠키 파싱 (예: refreshToken)
              // if (setCookieHeader) {
              //   // const cookiesArray = setCookieHeader.split(', ')
              //   // const refreshToken = cookiesArray.find(cookie => cookie.startsWith('refreshToken='))

              //   console.log('Refresh Token:', setCookieHeader?.split('refreshToken=')[1])
              //   cookies().set('refreshToken', setCookieHeader?.split('refreshToken=')[1])
              // }

              // accessToken to session
              user.accessToken = res.headers.get('Authorization')
              user.userId = data.userId
              break
            case 404:
              console.log(data.message)
              return 'error'
            case 404:
              console.log(data.message)
              return 'error'
            default:
              console.log('credentails login error')
              return 'error'
          }
        } catch (error) {
          console.log(error)
          return 'error'
        }
      }
      // Kakao Login API : /auth/kakao
      else if (account?.provider === 'kakao') {
        console.log('Login with kakao')

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/kakao-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              access_token: account.access_token,
            }),
          })

          const status = res.status
          const data = await res.json()

          switch (status) {
            case 200:
            case 201:
              // accessToken to session
              user.accessToken = res.headers.get('Authorization')
              user.userId = data.userId
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
      else if (account?.provider === 'google') {
        console.log('Login with google')
        // console.log(account['id_token'])

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/auth/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              access_token: account['id_token'],
            }),
          })

          const status = res.status
          const data = await res.json()

          switch (status) {
            case 200:
            case 201:
              // accessToken to session
              user.accessToken = res.headers.get('Authorization')
              user.userId = data.userId
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
      } else {
        return 'error'
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
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.provider = user.provider
        token.userId = user.userId
      }

      console.log('jwt', token)

      return token
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.accessToken = token.accessToken
      session.provider = token.provider
      session.userId = token.userId

      console.log('session', session)

      return session
    },
  },
})
