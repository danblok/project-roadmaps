import clsx from 'clsx'
import { signIn } from 'next-auth/react'

const SignIn = ({ loading }: { loading: boolean }) => {
  return (
    <div className="flex flex-row items-center">
      <a
        href={`/api/auth/signin`}
        className={clsx(
          'py-2 bg-blue-400 rounded-xl border-2 border-blue-400',
          'px-3 sm:px-6 text-md text-white font-bold tracking-wider',
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
  )
}

export default SignIn
