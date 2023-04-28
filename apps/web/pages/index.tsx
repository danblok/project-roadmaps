import clsx from 'clsx'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Quick Roadmaps</title>
      </Head>
      <div
        className={clsx(
          'text-2xl font-bold text-red-500',
          'flex justify-center items-center'
        )}
      >
        Home
      </div>
    </>
  )
}
