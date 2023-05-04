import React, { PropsWithChildren } from 'react'
import { FieldError } from 'react-hook-form'

type ErrorFieldMessageWrapperProps = {
  error?: FieldError
}

function ErrorFieldMessageWrapper({
  children,
  error,
}: PropsWithChildren<ErrorFieldMessageWrapperProps>) {
  return (
    <div>
      {children}
      {error && (
        <p
          role="alert"
          className="text-bittersweet ml-2 inline-block"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

export default ErrorFieldMessageWrapper
