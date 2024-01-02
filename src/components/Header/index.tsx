'use client'

import { useLocale } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import LangsComp from '@/components/LangsComp'
import ImageFallback from '../ImageFallback'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Logo />
        <RightNav />
      </HeaderWrapper>
    </>
  )
}

export const HeaderWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: string
}) => {
  const [isWebview, sIsWebview] = useState(false)

  const [isHeaderVisible, setHeaderVisible] = useState(true)
  const searchParams = useSearchParams()
  const hiddenHeaderAndFooter = searchParams.get('hideHeaderAndFooter')

  useEffect(() => {
    var is_uiwebview = navigator.userAgent.includes('WebView')
    sIsWebview(is_uiwebview)
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
          `ct-container flex h-[70px] items-center justify-between 3xl:h-[80px]`,
          style,
        )}
      >
        {children}
      </div>
    </header>
  )
}

export const Logo = () => {
  const router = useRouter()
  const locale = useLocale()
  return (
    <button
      title='button'
      type='button'
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
      className='block'
    >
      <ImageFallback
        src='/logo/textLogo.png'
        alt='Logo nav'
        width={256}
        height={176}
        className={`pointer-events-none h-[60px] w-auto object-contain rounded-[15px] overflow-hidden shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]`}
      />
    </button>
  )
}

const RightNav = () => {
  return (
    <>
      <div className='bg-white rounded-full px-2'>
        <Link href='/' className='bg-primary-yellow px-5 py-2'>
          Nhập hội Vua Thợ
        </Link>
        <Link href='/invite' className='bg-[#F8F8F8] px-5 py-2'>
          Dãy số may mắn
        </Link>
        <LangsComp />
      </div>
    </>
  )
}

export default Header
