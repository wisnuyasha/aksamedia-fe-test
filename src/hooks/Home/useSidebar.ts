import React from 'react'
import { useActivePageStore } from '../../store/useActivePageStore'

const useSidebar = () => {
  const { handleActivePage } = useActivePageStore()

  const useSidebarKey = () => {
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.altKey && event.key === '1') {
          event.preventDefault()
          handleActivePage('todos')
        }
        if (event.altKey && event.key === '2') {
          event.preventDefault()
          handleActivePage('add')
        }
        if (event.altKey && event.key === '3') {
          event.preventDefault()
          handleActivePage('profile')
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [])
  }

  return {
    useSidebarKey,
  }
}

export default useSidebar
