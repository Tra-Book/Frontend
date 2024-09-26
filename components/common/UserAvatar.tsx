import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AvatarProps {
  imgSrc: string
}

const UserAvatar = ({ imgSrc }: AvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={imgSrc} alt='User Avatar' />
      <AvatarFallback>TB</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
