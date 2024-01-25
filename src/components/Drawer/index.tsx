'use client'

import React, { memo, useEffect } from 'react'

import { Add as AddIcon } from 'iconsax-react'
//@ts-ignore
import { Button } from '@nextui-org/react'

type DrawerType = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title: any
  width?: string
  children?: React.ReactNode
  onClose?: any
  isBgWhite?: boolean
  header: React.ReactNode
}

const Drawer: React.FC<DrawerType> = ({ isOpen, setIsOpen, title, children, onClose, isBgWhite, header }) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.nativeEvent) {
        event.nativeEvent.stopImmediatePropagation()
      }
      if (event.key === 'Escape') {
        onClose ? onClose() : setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      className={`${isOpen ? 'translate-y-[50%]' : 'translate-y-[100%]'}  fixed bottom-0 right-0 top-0 z-10 flex w-full flex-col ${
        isBgWhite ? 'bg-white' : 'bg-[#4770FF]'
      } transition`}
    >
      <div className='flex items-center justify-between p-4'>
        {header}
        <Button isIconOnly onClick={() => setIsOpen(false)} className='bg-transparent'>
          <AddIcon className='rotate-45 text-white' />
        </Button>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default memo(Drawer)
