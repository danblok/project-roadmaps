import { Status } from 'database'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import useProjectContext from './ProjectContext'
import { Listbox, Transition } from '@headlessui/react'
import {
  ChevronUpDownIcon,
  CheckIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/20/solid'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CreateStatusDialog from './CreateStatusDialog'
import { deleteStatus } from '@/api/status'
import Loader from '../Loader'

type StatusListProps = {
  selected?: Status
  setSelected: Dispatch<SetStateAction<Status | undefined>>
  isEditable: boolean
}

export default function Statuses({
  selected,
  setSelected,
  isEditable,
}: StatusListProps) {
  const queryClient = useQueryClient()
  const {
    project: { statuses, tasks },
  } = useProjectContext()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteStatus(id)
    },
  })

  return (
    <>
      {deleteMutation.isLoading && <Loader />}
      <CreateStatusDialog isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Listbox value={selected} onChange={setSelected} disabled={!isEditable}>
        <div className="relative mt-1 sm:min-w-[16rem] w-full sm:w-auto">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              <button
                onClick={() => {
                  setIsModalOpen(true)
                }}
                type="button"
                className="flex flex-nowrap justify-between w-full py-2 pl-10 pr-4 border-b border-b-slate-300 rounded-b-sm items-center"
              >
                <p className="text-cornflower-blue">Add new</p>
                <PlusIcon width={20} height={20} className="text-bittersweet" />
              </button>
              {statuses.map((status) => (
                <Listbox.Option
                  key={status.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={status}
                >
                  {({ selected }) => (
                    <div className="flex justify-between items-center">
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {status.name}
                      </span>
                      {
                        // if a status is not global or it's not connected to a task
                        status.projectId &&
                          !tasks.some((t) => t.statusId === status.id) && (
                            <TrashIcon
                              width={20}
                              height={20}
                              className="text-cornflower-blue cursor-pointer min-w-[1.25rem]"
                              onClick={async () => {
                                await deleteMutation.mutateAsync(status.id, {
                                  onSuccess: () => {
                                    queryClient.invalidateQueries({
                                      queryKey: ['project'],
                                    })
                                  },
                                })
                                setSelected(statuses[0])
                              }}
                            />
                          )
                      }
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  )
}
