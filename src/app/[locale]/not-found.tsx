'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const t = useTranslations('NotFound')

  return (
    <div className='w-full'>
      <div className='flex h-[80vh] w-full flex-col items-center justify-center'>
        <div className='flex-center h-full w-full bg-[#4F62DD]'>
          <div className='flex-center flex-col gap-10'>
            <Image src={'/images/404.webp'} alt='' width={750} height={370} />
            <p className='text-[4rem] text-[#DFE3FF]'>{t('text')}</p>
            <Link
              href={'/'}
              className='flex h-[40px] select-none items-center justify-center rounded-2xl bg-[#5C6DE8] px-10 text-[2.2rem] text-[#fff] 13inch:h-[48px]'
            >
              {t('button')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
