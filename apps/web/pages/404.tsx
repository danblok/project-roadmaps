export default function Page404() {
  return (
    <div className="h-full text-center flex flex-col items-center justify-center align-middle">
      <div>
        <h1 className="next-error-h1 inline-block mx-5 pr-6 text-2xl align-top leading-[49px]">
          404
        </h1>
        <div className="inline-block text-left sm:border-l sm:border-l-gray-500 pl-8">
          <h2 className="text-sm font-normal leading-[49px]">
            This page could not be found.
          </h2>
        </div>
      </div>
    </div>
  )
}
