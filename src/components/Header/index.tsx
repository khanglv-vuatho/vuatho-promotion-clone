'use client'

import { useLocale } from 'next-intl'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import ImageFallback from '../ImageFallback'

export const HeaderWrapper = memo(({ children, style }: { children: React.ReactNode; style?: string }) => {
  const openMenu = useSelector((state: any) => state.openMenu)
  const [isHeaderVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    let prevScrollPos = window.scrollY
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (currentScrollPos > prevScrollPos && currentScrollPos > 60) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }
      prevScrollPos = currentScrollPos
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header id='header' className={`header fixed top-0 left-0 right-0 z-[11] transition ${isHeaderVisible ? 'translate-y-0' : '-translate-y-[100%]'}`}>
      <div className={twMerge(`ct-container flex h-[70px] items-center justify-between 3xl:h-[80px] transition ${openMenu ? 'bg-white ' : ''}`, style)}>
        {children}
      </div>
    </header>
  )
})

export const Logo = memo(() => {
  const openMenu = useSelector((state: any) => state.openMenu)

  const locale = useLocale()

  const pathName = usePathname()

  const isInvite = pathName.includes('invite')

  return (
    <Link href={isInvite ? `/${locale}/invite` : `/${locale}`} className='block'>
      <ImageFallback
        src='/logo/textLogo.png'
        alt='Logo nav'
        width={256}
        height={176}
        className={`h-[60px] w-auto object-contain rounded-[15px] pointer-events-none select-none overflow-hidden ${
          openMenu ? '' : 'shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]'
        }`}
      />
    </Link>
  )
})
