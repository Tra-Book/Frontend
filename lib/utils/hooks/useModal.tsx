import { useState } from 'react'

import { InfoModal, ModalData } from '@/components/common/Modals'
import { ClientModalData } from '@/lib/constants/errors'

function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<ModalData>(ClientModalData.dupEmailError)

  // Modal 여닫기
  // const handleModal = (val: boolean) => setIsOpen(val)

  // Modal 데이터 바꾸기
  const handleModalStates = (modalData: ModalData, openBool: 'open' | 'close') => {
    setModalData(modalData)
    setIsOpen(openBool === 'open' ? true : false)
  }

  interface ModalProps {
    onConfirm: () => void
  }
  // 실제 모달 컴포넌트
  const Modal = ({ onConfirm }: ModalProps) => {
    return <InfoModal isOpen={isOpen} data={modalData} onClose={() => setIsOpen(false)} onConfirm={onConfirm} />
  }
  return {
    // isOpen,
    modalData,
    // handleModal,
    handleModalStates,
    Modal,
  }
}

export default useModal
