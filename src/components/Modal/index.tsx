'use client'

import React from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, Button } from '@nextui-org/react'
import { Add } from 'iconsax-react'
import { twMerge } from 'tailwind-merge'

type DefaultModal = {
  isOpen: boolean
  onOpenChange: () => void
  title?: React.ReactNode | string
  modalBody?: any
  defaultOpen?: boolean
  hiddenCloseBtn?: boolean
  hiddenHeader?: boolean
  styleHeader?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'xs' | '3xl' | '4xl' | '5xl'
}

export const DefaultModal: React.FC<DefaultModal> = ({
  isOpen,
  onOpenChange,
  modalBody,
  defaultOpen,
  title,
  hiddenCloseBtn,
  hiddenHeader,
  size,
  styleHeader,
  className
}) => {
  return (
    <>
      <Modal
        isOpen={defaultOpen ? true : isOpen}
        onOpenChange={defaultOpen ? () => {} : onOpenChange}
        hideCloseButton
        defaultOpen={defaultOpen || false}
        size={size ? size : '5xl'}
        placement='center'
        classNames={{
          body: 'p-0',
          header: 'p-0 pl-8',
          base: 'rounded-[16px] max-w-[900px]'
        }}
        className={className}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!hiddenHeader && (
                <ModalHeader className={twMerge(`relative flex items-center p-2 ${title ? 'justify-between' : 'justify-end'}`, styleHeader)}>
                  {title}
                  {!hiddenCloseBtn && (
                    <Button
                      isIconOnly
                      radius='full'
                      onPress={onClose}
                      variant='light'
                      className='absolute right-[1%] top-[10%] h-[48px] w-[48px] min-w-[unset] cursor-pointer'
                    >
                      <Add className='rotate-45  ' size={32} />
                    </Button>
                  )}
                </ModalHeader>
              )}
              <ModalBody>{modalBody}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
