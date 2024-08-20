import { create } from 'zustand'

interface userState {
  userName: string
  mutateName: (newName: string) => void
  logout: () => void
}

export const useUserStore = create<userState>()((set) => ({
  userName:
    typeof window !== 'undefined' ? (localStorage.getItem('name') ?? '') : '',
  mutateName: (newName) => {
    set({ userName: newName })
    localStorage.setItem('name', newName)
  },
  logout: () => {
    set({ userName: '' })
    localStorage.removeItem('name')
  },
}))
