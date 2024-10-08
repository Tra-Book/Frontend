import React, { ReactNode } from 'react'

import { auth } from '@/auth'
import ProfileChange from '@/components/main/ProfileChange'
import { UserInfo } from '@/lib/types/Session'

interface MainInfoPageProps {}

const MainInfoPage = async ({}: MainInfoPageProps): Promise<ReactNode> => {
  const s: any = await auth()

  const session: UserInfo = {
    email: s.user.email,
    accessToken: s.user.accessToken,
    provider: s.user.provider,
    status_message: s.user.status_message,
    image: s.user.image,
    nickname: s.user.nickname,
  }

  return <ProfileChange session={session} />
}

export default MainInfoPage
