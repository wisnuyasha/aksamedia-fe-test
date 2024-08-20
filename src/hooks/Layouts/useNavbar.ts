import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

export function useNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useUserStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleDropdownOpen = () => {
    setIsOpen(true)
  }

  const toggleDropdownClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'l') {
        event.preventDefault()
        toggleDropdownOpen()
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        toggleDropdownClose()
      }
      if (event.altKey && event.key === 'Enter') {
        event.preventDefault()
        handleLogout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return {
    isOpen,
    handleLogout,
    toggleDropdownOpen,
    toggleDropdownClose,
  }
}
