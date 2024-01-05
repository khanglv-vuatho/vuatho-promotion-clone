'use client'

import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import LangsComp from '@/components/LangsComp'
import ImageFallback from '../ImageFallback'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export const HeaderWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  const openMenu = useSelector((state: any) => state.openMenu)

  const [isWebview, setIsWebview] = useState(false)

  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  useEffect(() => {
    var is_uiwebview = navigator.userAgent.includes('WebView')
    setIsWebview(is_uiwebview)
  }, [])

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

  if (isWebview) {
    return null
  }

  if (hiddenHeaderAndFooter) return null

  return (
    <header
      id='header'
      className={`header fixed left-0 right-0 z-[11] w-full transition ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-[100%]'
      }`}
    >
      <div
        className={twMerge(
          `ct-container flex h-[70px] items-center justify-between 3xl:h-[80px] ${
            openMenu ? 'bg-white' : 'transition'
          }`,
          style,
        )}
      >
        {children}
      </div>
    </header>
  )
}

export const Logo = () => {
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
        className={`pointer-events-none h-[60px] w-auto object-contain rounded-[15px] pointer-events-none select-none overflow-hidden ${
          openMenu ? '' : 'shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]'
        }`}
      />
    </Link>
  )
}
