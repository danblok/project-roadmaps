import clsx from 'clsx'

export default function Home() {
  return (
    <div
      className={clsx(
        'text-2xl font-bold text-red-500',
        'flex justify-center items-center',
        'h-screen w-screen'
      )}
    >
      Home
    </div>
  )
}
