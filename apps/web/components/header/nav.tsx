import clsx from 'clsx'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="sm:mr-6">
      <ul className="text-xl mr-1 sm:mr-2">
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
