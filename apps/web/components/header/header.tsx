import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import Profile from './Profile'
import SignIn from './SignIn'
import Nav from './nav'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === 'loading'

  return (
    <header className="row-start-1 row-end-2">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div
        className={
          'p-6 sm:p-8 flex justify-around sm:justify-end items-center'
        }
      >
        <Nav />
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
          {!session && <SignIn loading={loading} />}
          {session?.user && (
            <Profile
              image={session.user.image}
              name={session.user.name}
            />
          )}
        </div>
      </div>
    </header>
  )
}