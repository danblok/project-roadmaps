import { deleteProfile, getProfile, updateProfile } from '@/api/profile'
import { UpdateAccountInput } from '@/api/types'
import ActionButton from '@/components/ActionButton'
import ErrorFieldMessageWrapper from '@/components/ErrorFieldWrapper'
import FormModal from '@/components/FormModal'
import Loader from '@/components/Loader'
import { Title } from '@/components/Title'
import { CubeIcon, Squares2X2Icon, UserIcon } from '@heroicons/react/20/solid'
import {
  QueryClient,
  dehydrate,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import clsx from 'clsx'
import { prisma } from 'database'
import { GetServerSideProps } from 'next'
import { JWT, getToken } from 'next-auth/jwt'
import { signOut } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { Dispatch, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type ProfileProps = {
  sessionUser: JWT
}

type FormData = UpdateAccountInput

export default function Profile({ sessionUser }: ProfileProps) {
  const queryClient = useQueryClient()
  const { data: account, isLoading } = useQuery(
    ['account'],
    async () => await getProfile(sessionUser.accountId)
  )
  const updateMutation = useMutation({
    mutationFn: (account: UpdateAccountInput) => {
      return updateProfile(sessionUser.accountId, account)
    },
  })

  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await updateMutation.mutateAsync(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['account'],
        })
      },
    })
  }

  return (
    <>
      <Head>
        <title>My profile</title>
      </Head>
      <div className="bg-white mx-6 rounded-xl">
        {(isLoading || updateMutation.isLoading) && <Loader />}
        <Title title="Profile settings" />
        <div className="mt-4 p-4 lg:p-8 md:flex flex-nowrap items-start">
          <Avatar name={sessionUser.name} picture={sessionUser.picture} />
          <div className="mt-4 lg:mt-0 flex-grow">
            <form
              className="flex flex-col border-b border-slate-200 pb-6"
              onSubmit={async (e) => {
                e.preventDefault()
                await handleSubmit(onSubmit)()
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-cornflower-blue text-xl mr-4 font-bold"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="text"
                  className={clsx(
                    'border-2 border-slate-400 rounded-md',
                    'px-2 mt-4 w-full sm:w-1/2 bg-cornflower-blue bg-opacity-20',
                    (isLoading || updateMutation.isLoading) &&
                      'bg-opacity-100 text-cornflower-blue'
                  )}
                  disabled
                  value={account?.email}
                />
              </div>
              <ErrorFieldMessageWrapper error={errors.name}>
                <label
                  htmlFor="name"
                  className="text-cornflower-blue text-xl mr-4 font-bold"
                >
                  Your name
                </label>
                <input
                  {...register('name', {
                    required: 'Name is required',
                    maxLength: {
                      value: 50,
                      message: 'Max length is 50',
                    },
                    value: account?.name,
                  })}
                  id="name"
                  name="name"
                  type="text"
                  className={clsx(
                    'border-2 border-slate-400 rounded-md',
                    'px-2 mt-4 w-full sm:w-1/2',
                    (isLoading || updateMutation.isLoading) &&
                      'bg-cornflower-blue text-cornflower-blue',
                    errors.name && 'focus:border-bittersweet'
                  )}
                  placeholder="Your name"
                  disabled={updateMutation.isLoading}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
              </ErrorFieldMessageWrapper>
              <div className="mt-4">
                <ActionButton
                  type="submit"
                  isActionLoading={updateMutation.isLoading}
                >
                  Update
                </ActionButton>
              </div>
            </form>
            {account && (
              <>
                <ExtraInfo
                  contributed={account.projects.length}
                  owned={account.ownedProjects.length}
                />
                <ActionButton
                  type="button"
                  onClick={() => setDeleteDialogIsOpen(true)}
                >
                  Delete Account
                </ActionButton>
                <DeleteDialog
                  accountId={account.id}
                  setIsOpen={setDeleteDialogIsOpen}
                  isOpen={deleteDialogIsOpen}
                  email={account.email}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sub, ...account } = (await getToken({
    req: context.req,
  })) as JWT

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    ['account'],
    async () =>
      await prisma.account.findUnique({
        where: {
          id: account.accountId,
        },
        include: {
          ownedProjects: {
            select: {
              _count: true,
            },
          },
          projects: {
            select: {
              _count: true,
            },
          },
        },
      })
  )

  return {
    props: {
      sessionUser: account,
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Avatar = ({
  name,
  picture,
}: {
  name: string
  picture?: string | null
}) => {
  return (
    <div className="basis-1/3 flex flex-col items-center md:mr-8">
      {picture ? (
        <Image
          src={picture}
          alt={`${name}'s avatar`}
          width={160}
          height={160}
          className={'rounded-full'}
          priority
        />
      ) : (
        <UserIcon width={160} height={160} className="text-cornflower-blue" />
      )}
    </div>
  )
}

const ExtraInfo = ({
  owned,
  contributed,
}: {
  owned: number
  contributed: number
}) => {
  return (
    <>
      <div className="border-b py-6">
        <p className="text-xl">
          <CubeIcon
            height={28}
            width={28}
            className="inline mr-2 text-cornflower-blue"
          />{' '}
          You own{' '}
          <span className="text-cornflower-blue font-bold">{owned} </span>
          projects
        </p>
      </div>
      <div className="border-b py-6">
        <p className="text-xl">
          <Squares2X2Icon
            height={28}
            width={28}
            className="inline mr-2 text-cornflower-blue"
          />{' '}
          You have contributed in{' '}
          <span className="text-cornflower-blue font-bold">{contributed} </span>
          projects
        </p>
      </div>
    </>
  )
}

type DeleteAccountDialogProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  accountId: string
  email: string
}

function DeleteDialog({
  accountId,
  isOpen,
  setIsOpen,
  email,
}: DeleteAccountDialogProps) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (accountId: string) => {
      return deleteProfile(accountId)
    },
  })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>()

  const onSubmit = async () => {
    await mutation.mutateAsync(accountId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['account'],
        })
        setIsOpen(false)
        signOut()
      },
    })
  }

  return (
    <FormModal
      title="Delete Account"
      isOpen={isOpen}
      onClose={() => {
        if (!mutation.isLoading) {
          setIsOpen(false)
          reset()
        }
      }}
      isDataLoading={mutation.isLoading}
    >
      <div className="mt-4">
        <p className="text-sm text-gray-500">
          Deleting your account will purge all of your projects and remove you
          out of all the projects you contribute.
        </p>
        <p className="text-sm text-gray-500">
          In order to delete account, type in{' '}
          <span className="text-bittersweet font-bold">{email}</span> and press
          the button
        </p>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await handleSubmit(onSubmit)()
        }}
      >
        <ErrorFieldMessageWrapper error={errors.email}>
          <label>
            <input
              {...register('email', {
                required: 'Email is required',

                validate: (value) => value === email || 'Match with your email',
                value: '',
              })}
              name="email"
              type="email"
              className={clsx(
                'border-2 border-slate-400 rounded-md',
                'px-2 mt-4 w-full',
                errors.email && 'focus:border-bittersweet'
              )}
              placeholder="Your email"
              disabled={mutation.isLoading}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </label>
        </ErrorFieldMessageWrapper>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-bittersweet px-6 py-2 text-md font-bold text-white hover:bg-cornflower-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors tracking-wider mt-4"
          disabled={mutation.isLoading}
        >
          Delete Account
        </button>
      </form>
    </FormModal>
  )
}
