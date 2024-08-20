import React, { FormEvent } from 'react'
import clsxm from '../../utils/clsxm'
import { useUserStore } from '../../store/useUserStore'

export default function EditUserForm() {
  const { mutateName, userName } = useUserStore()
  const [updatedName, setUpdatedName] = React.useState<string>(userName)

  function handleChangeName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (updatedName !== userName) {
      mutateName(updatedName)
    }
  }

  return (
    <div className="w-full max-w-5xl px-8 md:pt-56">
      <div className="rounded-xl border-[1px] border-zinc-300 bg-white drop-shadow dark:border-zinc-700 dark:bg-zinc-950">
        <form onSubmit={handleChangeName}>
          <div className="flex flex-col gap-y-6 p-6">
            <div className="flex flex-col gap-x-1.5">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 md:text-lg">
                Edit Name
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 md:text-base">
                Edit your name here
              </p>
            </div>
            <input
              name="name"
              className={clsxm(
                'w-full rounded-lg border-[1px] border-zinc-300 px-3 py-2 text-base shadow-sm hover:border-zinc-500 hover:duration-500 focus:border-[1px] focus:outline-zinc-700 dark:border-zinc-700 dark:bg-transparent dark:text-white'
              )}
              onChange={(e) => setUpdatedName(e.target.value)}
              value={updatedName}
              required
            />
          </div>

          <div className="seperator h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />

          <div className="p-6">
            <button
              type="submit"
              className="rounded-md border-[1px] border-zinc-900 bg-zinc-900 px-5 py-2 hover:bg-zinc-700 hover:duration-500 dark:bg-zinc-50 dark:hover:bg-zinc-300 md:py-2"
            >
              <p className="font-sans text-sm font-medium text-zinc-50 dark:text-zinc-900 md:text-base">
                Save
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
