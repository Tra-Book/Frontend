import { useState } from 'react'

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleModal = (val: boolean) => setIsModalOpen(val)
  return {
    isOpen: isModalOpen,
    setIsOpen: handleModal,
  }
}

export default useModal
