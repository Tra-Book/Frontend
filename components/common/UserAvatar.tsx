import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { USER_DEFAULT_IMAGE } from '@/lib/constants/dummy_data'

interface AvatarProps {
  imgSrc: string
}

const UserAvatar = ({ imgSrc }: AvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={imgSrc} alt='User Avatar' />
      <AvatarFallback>
        <AvatarImage src={USER_DEFAULT_IMAGE} />
      </AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
