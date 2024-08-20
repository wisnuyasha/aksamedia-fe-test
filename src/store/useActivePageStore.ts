import { create } from 'zustand'
import { TSidebarMenu } from '../types/TSidebarMenus'

interface activePageState {
  activePage: TSidebarMenu['name']
  handleActivePage: (page: TSidebarMenu['name']) => void
}

export const useActivePageStore = create<activePageState>()((set) => ({
  activePage: 'todos',
  handleActivePage: (page) => {
    set({ activePage: page })
  },
}))
