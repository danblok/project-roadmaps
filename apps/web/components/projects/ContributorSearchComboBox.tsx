import { Account } from 'database'
import { getProfiles } from '@/api/profile'
import { addContributor } from '@/api/project'
import { AddRemoveContributorInput } from '@/api/types'
import useDebounce from '@/hooks/useDebounce'
import { Combobox, Transition } from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import {
  useQueryClient,
  useQuery,
  useMutation,
} from '@tanstack/react-query'

import {
  ComponentPropsWithoutRef,
  useState,
  useEffect,
  Fragment,
} from 'react'
import Loader from '../Loader'
import useProjectContext from './ProjectContext'
import ActionButton from '../ActionButton'

export default function ContributorSearchComboBox({
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  const queryClient = useQueryClient()
  const { project } = useProjectContext()
  const [selected, setSelected] = useState<Account>()
  const [filterInput, setFilterInput] = useState('')
  const filter = useDebounce(filterInput)

  const { data: accounts = [], refetch } = useQuery({
    queryKey: [],
    queryFn: () => getProfiles(filter),
    enabled: false,
  })
  const mutation = useMutation({
    mutationFn: async ({
      projectId,
      contributorId,
    }: AddRemoveContributorInput) =>
      await addContributor(projectId, contributorId),
  })

  useEffect(() => {
    if (filter) {
      refetch()
    }
  }, [filter])

  function handleAdd() {
    if (
      selected &&
      !project.contributors
        .map((c) => c.id)
        .includes(selected.id)
    ) {
      mutation.mutate(
        {
          projectId: project.id,
          contributorId: selected.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['project'])
          },
        }
      )
    }
  }

  return (
    <div {...props}>
      {mutation.isLoading && <Loader />}
      <div className="w-full">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
              <Combobox.Input
                className="w-full border-none py-2 pl-3 pr-10 text-lg leading-5 text-gray-900 focus:ring-0 text-center"
                displayValue={(account: Account) =>
                  account.name
                }
                onChange={(event) => {
                  setFilterInput(event.target.value)
                }}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => {
                setFilterInput('')
              }}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {accounts.length === 0 && filter !== '' ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  accounts.map((account) => (
                    <Combobox.Option
                      key={account.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-cornflower-blue text-white'
                            : 'text-gray-900'
                        }`
                      }
                      value={account}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected
                                ? 'font-medium'
                                : 'font-normal'
                            }`}
                          >
                            {account.name} {account.email}
                          </span>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active
                                  ? 'text-white'
                                  : 'text-cornflower-blue'
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
      <ActionButton
        type="button"
        samePadding
        onClick={handleAdd}
      >
        <PlusIcon
          width={20}
          height={20}
          className="white"
        />
      </ActionButton>
    </div>
  )
}
