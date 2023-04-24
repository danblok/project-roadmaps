import { Menu, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Fragment } from 'react'
import { signOut, useSession } from 'next-auth/react'

export default function More() {
  return (
    <div className="absolute text-left -right-5">
      <Menu
        as="div"
        className="relative inline-block text-left"
      >
        <div>
          <Menu.Button className="inline-flex justify-center rounded-md bg-white bg-opacity-20 pl-9 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-gray-900 hover:text-gray-900"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className={`${
                      active
                        ? 'bg-cornflower-blue text-white'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    href={`/profile`}
                  >
                    <UserCircleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Profile
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active
                        ? 'bg-cornflower-blue text-white'
                        : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault()
                      signOut()
                    }}
                  >
                    <ArrowLeftOnRectangleIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Log out
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
