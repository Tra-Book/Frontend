import Image from 'next/image'
import Link from 'next/link'

import Slogan from '@/components/common/Slogan'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'
import LucideIcon from '@/lib/icons/LucideIcon'
import { cn } from '@/lib/utils/cn'
import LogoImage from '@/public/images/logo.svg'

interface NotFoundType {
  className?: string
}

const MobileNotFound = ({ className }: NotFoundType) => {
  return (
    <div className={cn('flex h-screen w-screen flex-col items-center justify-center gap-4', className)}>
      <div className='flex flex-col items-center justify-center'>
        <Image src={LogoImage} alt='TraBook Logo' width={94} height={69} />
        <Slogan subTitleClassName='text-xs' />
      </div>
      <div className='sm:gap- flex flex-col items-center justify-center text-lg font-semibold sm:flex-row'>
        <p>요청하신 페이지를</p>
        <p>찾을 수 없습니다.</p>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p>찾고 계신 페이지 주소는 변경되었거나</p>
        <p>삭제되었을 수 있습니다.</p>
      </div>
      <p className='font-semibold text-tbRed'>Error Code 404</p>
      <Link href={ROUTES.HOME.url}>
        <Button
          variant='tbPrimary'
          className='relative flex h-14 w-36 items-center justify-center gap-3 text-xl font-semibold'
        >
          홈 가기
          <LucideIcon name='ArrowUpRight' />
        </Button>
      </Link>
    </div>
  )
}

const DesktopNotFound = ({ className }: NotFoundType) => {
  return (
    <div className={cn('h-screen w-screen items-center justify-center', className)}>
      <div className='flex w-1/2 min-w-fit max-w-[760px] flex-col items-start justify-start gap-4'>
        <div className='flex flex-col items-center justify-center'>
          <Image src={LogoImage} alt='TraBook Logo' width={94} height={69} />
          <Slogan subTitleClassName='text-xs' />
        </div>
        <p className='text-2xl font-semibold xl:text-3xl'>요청하신 페이지를 찾을 수 없습니다.</p>
        <p className='xl:text-lg'>찾고 계신 페이지 주소는 변경되었거나 삭제되었을 수 있습니다.</p>
        <p className='font-semibold text-tbRed'>Error Code 404</p>
        <Link href={ROUTES.HOME.url}>
          <Button
            variant='tbPrimary'
            className='relative flex h-14 w-36 items-center justify-center gap-3 text-xl font-semibold'
          >
            홈 가기
            <LucideIcon name='ArrowUpRight' />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <>
      <MobileNotFound className='sm:hidden' />
      <DesktopNotFound className='hidden sm:flex' />
    </>
  )
}
