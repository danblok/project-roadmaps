import { UserIcon } from '@heroicons/react/20/solid'
import { Account } from 'database'
import Image from 'next/image'
import { memo } from 'react'

export function ContributorItem({
  contributor,
}: {
  contributor: Account
}) {
  return (
    <div className="flex gap-2 px-6 py-2 w-full items-center shadow-md shadow-slate-400 rounded-md">
      {contributor.avatar ? (
        <Image
          src={contributor.avatar}
          alt={`${contributor.name}'s avatar`}
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
      <div>
        <p className="text-lg text-cornflower-blue font-bold">
          {contributor.name}
        </p>
        <p className="text-base text-slate-400 mt-0.5">
          {contributor.email}
        </p>
      </div>
    </div>
  )
}

export default memo(ContributorItem)
