import { ArrowPathIcon } from '@heroicons/react/20/solid'
import React from 'react'

function FormModalLoader() {
  return (
    <div className="absolute bg-slate-200 left-0 w-full top-0 h-full bg-opacity-50">
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <ArrowPathIcon
          className="animate-spin text-cornflower-blue"
          height={100}
          width={100}
        />
      </div>
    </div>
  )
}

export default FormModalLoader
