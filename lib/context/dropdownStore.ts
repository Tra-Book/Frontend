import { create } from 'zustand'

interface DropdownContext {
  day: number
  setDay: (selectedDay: number) => void
  resetDay: () => void
}

const useDropdownStore = create<DropdownContext>(set => ({
  day: 1,
  setDay: (selectedDay: number) => {
    set(state => ({ day: selectedDay }))
  },
  resetDay: () => {
    set(state => ({ day: 1 }))
  },
}))

export default useDropdownStore
