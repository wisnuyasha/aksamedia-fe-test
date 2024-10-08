import { useState, useEffect } from 'react'
import { MdSunny } from 'react-icons/md'
import { MdDarkMode } from 'react-icons/md'

function ToggleTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode')
    return savedMode
      ? JSON.parse(savedMode)
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }

    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="absolute left-5 top-6 rounded-md border-[1px] border-zinc-300 bg-white p-3 drop-shadow-sm hover:bg-zinc-100 hover:transition-all hover:duration-200 hover:ease-linear dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-700 md:left-10 md:top-5"
    >
      {isDarkMode ? (
        <MdDarkMode className="size-5 text-zinc-100" />
      ) : (
        <MdSunny className="size-5 text-zinc-800" />
      )}
    </button>
  )
}

export default ToggleTheme
