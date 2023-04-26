import clsx from 'clsx'
import {
  signIn,
  signOut,
  useSession,
} from 'next-auth/react'
import Image from 'next/image'
import More from './more'
import Link from 'next/link'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header className="row-start-1 row-end-2">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={'p-8 flex justify-end items-center'}>
        <nav className="mr-6">
          <ul
            className={clsx(
              'flex flex-row gap-x-4 items-center justify-between',
              'text-xl'
            )}
          >
            <li
              className={clsx(
                'border-2 rounded-md border-transparent py-2 px-6',
                'text-cornflower-blue font-bold',
                'hover:border-cornflower-blue transition-all hover:text-bittersweet'
              )}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={clsx(
                'border-2 rounded-md border-transparent py-2 px-6',
                'text-cornflower-blue font-bold',
                'hover:border-cornflower-blue transition-all hover:text-bittersweet'
              )}
            >
              <Link href="/projects">Projects</Link>
            </li>
          </ul>
        </nav>
        <div
          className={clsx(
            'nojs-show mr-6 relative',
            !session && [
              'relative top-0 opacity-100 overflow-hidden',
              'm-0 transition-all ease-in duration-200',
            ],
            !session && loading && '-top-8 opacity-0'
          )}
        >
          {!session && (
            <div className="flex flex-row items-center">
              <a
                href={`/api/auth/signin`}
                className={clsx(
                  'py-2 bg-blue-400 rounded-xl border-2 border-blue-400',
                  'px-6 text-md text-white font-bold tracking-wider',
                  'hover:bg-white hover:text-blue-400',
                  loading && 'opacity-0'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </div>
          )}
          {session?.user && (
            <div className="flex flex-row items-center relative">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={`${session.user.name}'s avatar`}
                  width={40}
                  height={40}
                  className={'rounded-full'}
                />
              ) : (
                <Image
                  src="empty-avatar.png"
                  alt="Empty avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <More />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
