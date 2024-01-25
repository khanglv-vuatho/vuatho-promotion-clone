'use client'

import { Apple as AppleIcon, GooglePlay as GooglePlayIcon } from 'iconsax-react'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

export const AndroidBtn: React.FC<{ style?: any }> = memo(({ style }) => {
  const t = useTranslations('Download')

  return (
    <a
      href='https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
      target='_blank'
      className={twMerge(
        'group relative flex w-full max-w-[180px] select-none items-center gap-2 overflow-hidden rounded-xl bg-black p-2 text-white 2xl:min-w-[180px] 3xl:min-w-[220px] 3xl:p-4',
        style
      )}
    >
      <GooglePlayIcon variant='Bold' size={36} />
      <div>
        <span className='text-xs text-white/70'>{t('download_chplay')}</span>
        <h6 className='text-xs md:text-base'>Google Play </h6>
      </div>
      <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
      <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
    </a>
  )
})

export const IosBtn: React.FC<{ style?: any }> = memo(({ style }) => {
  const t = useTranslations('Download')

  return (
    <a
      href='https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'
      target='_blank'
      className={twMerge(
        'group relative flex w-full max-w-[180px] select-none items-center gap-2 overflow-hidden rounded-xl bg-black p-2 text-white 2xl:min-w-[180px] 3xl:min-w-[220px] 3xl:p-4',
        style
      )}
    >
      <AppleIcon variant='Bold' size={36} />
      <div>
        <span className='text-xs text-white/70'>{t('download_appstore')}</span>
        <h6 className='text-xs md:text-base'>App Store</h6>
      </div>
      <div className='absolute -right-1/3 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/[0.15] transition group-hover:-translate-x-1/2' />
      <div className='absolute -right-1/2 top-0 h-full w-1/2 -skew-x-[30deg] bg-white/10 transition group-hover:-translate-x-1/2' />
    </a>
  )
})
