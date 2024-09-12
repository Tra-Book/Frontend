import { useState } from 'react'

import { ConfirmModal, InfoModal, ModalData } from '@/components/common/Modals'
import { ClientModalData } from '@/lib/constants/errors'

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalData>(ClientModalData.dupEmailError)

  // Modal 데이터 바꾸기
  const handleModalStates = (modalData: ModalData, openBool: 'open' | 'close') => {
    setModalData(modalData)
    setIsOpen(openBool === 'open' ? true : false)
  }

  interface ModalProps {
    id: 'info' | 'confirm'
    onConfirm: () => void
  }
  // 실제 모달 컴포넌트
  const Modal = ({ id, onConfirm }: ModalProps) => {
    const Comp = id === 'info' ? InfoModal : ConfirmModal
    return <Comp isOpen={isOpen} data={modalData} onClose={() => setIsOpen(false)} onConfirm={onConfirm} />
  }
  return {
    modalData,
    handleModalStates,
    Modal,
  }
}

export default useModal
