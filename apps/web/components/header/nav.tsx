import clsx from 'clsx'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="mr-6">
      <ul
        className={clsx(
          'flex flex-row gap-x-1 sm:gap-x-2 items-center justify-between',
          'text-xl'
        )}
      >
        <li>
          <Link
            href="/"
            className={clsx(
              'border-2 rounded-md border-transparent py-1 px-3 sm:px-6 sm:py-2',
              'text-cornflower-blue font-bold cursor-pointer',
              'hover:border-cornflower-blue transition-all hover:text-bittersweet'
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className={clsx(
              'border-2 rounded-md border-transparent py-1 px-3 sm:px-6 sm:py-2',
              'text-cornflower-blue font-bold cursor-pointer',
              'hover:border-cornflower-blue transition-all hover:text-bittersweet'
            )}
          >
            Projects
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
