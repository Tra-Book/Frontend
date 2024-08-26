import React, { ReactNode } from 'react'

import { signOut } from '@/auth'

interface LoginErrorPageProps {}

const LoginErrorPage = async ({}: LoginErrorPageProps): Promise<ReactNode> => {
  await signOut({ redirect: false })

  return <div>로그인이 실패하였습니다...</div>
}

export default LoginErrorPage
