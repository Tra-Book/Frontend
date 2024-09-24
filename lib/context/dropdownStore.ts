import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DropdownContext {
  day: number
  setDay: (selectedDay: number) => void
  resetDay: () => void
}

const useDropdownStore = create(
  persist<DropdownContext>(
    set => ({
      day: 1,
      setDay: (selectedDay: number) => {
        set(state => ({ day: selectedDay }))
      },
      resetDay: () => {
        set(state => ({ day: 1 }))
      },
    }),
    {
      name: 'dropdown-context',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useDropdownStore
