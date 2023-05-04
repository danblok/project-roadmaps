import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
} from 'react'

type ActionButtonProps = {
  isActionLoading?: boolean
  samePadding?: boolean
}
export default function ActionButton({
  isActionLoading,
  children,
  samePadding = false,
  ...props
}: PropsWithChildren<
  ActionButtonProps &
    Pick<
      ComponentPropsWithoutRef<'button'>,
      'type' | 'onClick'
    >
>) {
  return (
    <button
      className={clsx(
        'inline-flex justify-center rounded-md border border-transparent bg-bittersweet py-2 text-md font-bold text-white hover:bg-cornflower-blue transition-colors tracking-wider',
        samePadding ? 'px-2' : 'px-6'
      )}
      disabled={isActionLoading}
      {...props}
    >
      {children}
    </button>
  )
}
