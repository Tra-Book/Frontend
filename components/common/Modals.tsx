import { cn } from '@/lib/utils/cn'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

interface InfoModalProps {
  isOpen: boolean // boolean state value
  data: ModalData
  onClose: () => void
  onConfirm: () => void // 확인 버튼 클릭 시 실행될 함수
}

export type ModalData = {
  title: string
  description: string
  isError: boolean // True: Red text False: Black Text
}
export const InfoModal = ({ isOpen, data, onClose, onConfirm }: InfoModalProps) => {
  const { title, description, isError = true }: ModalData = data

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm() // 확인 버튼 클릭 시 전달된 함수 실행
    }
    onClose() // 모달 닫기
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={cn(isError && 'text-tbRed')}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleConfirm} variant='tbPrimary' className='w-full'>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface ConfirmModalProps {
  isOpen: boolean // boolean state value
  data: ModalData
  onClose: () => void // 닫기
  onConfirm: () => void // 확인 버튼 클릭 시 실행될 함수
}

export const ConfirmModal = ({ isOpen, data, onClose, onConfirm }: ConfirmModalProps) => {
  const { title, description, isError = true }: ModalData = data

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm() // 확인 버튼 클릭 시 전달된 함수 실행
    }
    onClose() // 모달 닫기
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={cn(isError && 'text-tbRed')}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='relative flex w-full items-center justify-between gap-4'>
          <Button onClick={() => onClose()} variant='tbSecondary' className='w-full'>
            취소
          </Button>
          <Button onClick={handleConfirm} variant='tbPrimary' className='w-full'>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
