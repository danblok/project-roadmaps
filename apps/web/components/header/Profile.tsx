import { UserIcon } from '@heroicons/react/20/solid'
import More from '../more'
import Image from 'next/image'

export const Profile = ({
  name,
  image,
}: {
  name?: string
  image?: string | null
}) => (
  <div className="flex flex-row items-center relative">
    {image ? (
      <Image
        src={image}
        alt={`${name}'s avatar`}
        width={40}
        height={40}
        className={'rounded-full'}
      />
    ) : (
      <UserIcon
        width={40}
        height={40}
        className="text-cornflower-blue"
      />
    )}
    <More />
  </div>
)

export default Profile
