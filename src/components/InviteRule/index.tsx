'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

function InviteRule({ primaryText, step6, bottomText = '' }: { primaryText: string; step6?: any; bottomText?: string }) {
  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  const t = useTranslations('Promotion.GuidelinesPromotion')
  const td = useTranslations('Promotion.Hero')
  const tt = useTranslations('Promotion.ProtocolsInvite')
  const tp = useTranslations('Promotion.ProtocolsPromotion')
  const tr = useTranslations('Promotion.Reward')
  const tc = useTranslations('Promotion.ConditionDetails')
  const ti = useTranslations('Promotion.ImportantNote')
  const tph = useTranslations('Promotion.PromotionsHeader')

  return (
    <>
      <div className='flex flex-col gap-4 md:gap-10'>
        <p className={`${primaryText} font-semibold`}>
          1. {t('text0')}:{' '}
          <span className='font-light'>
            {isInvite ? td('text1-1') : td('text1')}
            {isInvite ? `- ${td('text8')}` : `- ${td('text8-1')}`}
          </span>
        </p>
        <p className={`${primaryText} font-semibold`}>
          2. {t('text1')} <span className='font-light'>{t('text2')}</span>
        </p>
        <p className={`${primaryText} font-semibold`}>
          3. {t('text3')} <span className='font-light'>{t('text4')}</span>
        </p>
        <p className={`${primaryText} font-semibold`}>
          4. {t('text5')} <span className='font-light'>{t('text6')}</span>
        </p>
        <p className={`${primaryText} font-semibold`}>
          5. {t('text7')} <span className='font-light'>{isInvite ? t('text8-1') : t('text8')}</span>
        </p>

        <div className={primaryText}>
          <p className='font-semibold'>6. {tp('text14')}:</p>
          <p className={`font-semibold`}>
            {tp('text17')}:{' '}
            <span className='font-light'>
              {tp('text21')} {isInvite ? ' Yamaha PG-1' : ' Honda Wave RSX FI 110'} {tp('text22')} {isInvite ? '35.000.000VND' : '25.000.000VND'}{' '}
            </span>
            <span className={twMerge('font-light text-[#969696]', bottomText)}>({tp('text23')}).</span>
          </p>
          <p className={`font-semibold`}>
            {tp('text15')}: <span className='font-light'>0{tp('text16')} </span>
            <span className={twMerge('font-light text-[#969696]', bottomText)}>({tp('text24')}).</span>
          </p>
          <p className={`font-semibold`}>
            {tp('text19')}: <span className='font-light'>0{tp('text20')}</span>
            <span className={twMerge('font-light text-[#969696]', bottomText)}> ({tp('text24')}).</span>
          </p>
          {step6 && step6}
        </div>
        <div className={primaryText + ' *:font-light'}>
          <p className=' !font-semibold'>7. {tt('title')}:</p>
          {isInvite ? (
            <>
              <p>{tt('text1')}</p>
              <p>{tt('text2')}</p>
              <p>{tt('text3')}</p>
              <p>{tt('text4')}</p>
              <p>{tt('text5')}</p>
              <p className='underline font-semibold'>{tt('text12')}:</p>
              <p>{tt('text13')}</p>
              <p>{tt('text14')}</p>
              <p>{tt('text9')}</p>
              <p>{tt('text16')}</p>
              <p>{tt('text17')}</p>
            </>
          ) : (
            <>
              <p>{tp('desc')}</p>
              <p>{tp('text1')}</p>
              <p>{tp('text2')}</p>
              <p>{tp('text3')}</p>
              <p>{tp('text4')}</p>
              <p>{tp('text5')}</p>
            </>
          )}
        </div>
        <div className={primaryText + ' *:font-light'}>
          <p className='!font-semibold'>8. {tr('title')}</p>
          <p>{tr('text1')}</p>
          <p>{tr('text2')}</p>
          <p>{tr('text3')}</p>
          <p>{tr('text4')}</p>
          <p>{tr('text5')}</p>
        </div>
        <div className={primaryText + ' *:font-light'}>
          <p className='!font-semibold'>9. {tc('title')}</p>
          <p>{tc('text1')}</p>
          <p>{tc('text2')}</p>
          <p>{tc('text3')}</p>
          <p>{tc('text4')}</p>
          <p>{tc('text5')}</p>
          <p> {tc('text6')}</p>
        </div>
        <div className={primaryText + ' *:font-light'}>
          <p className='!font-semibold'>10. {ti('title')}</p>
          <p>{isInvite ? ti('text1-1') : ti('text1')} </p>
          <ul className='list-inside list-disc'>
            <li>{isInvite ? ti('text2-1') : ti('text2')} </li>
            <li>{ti('text3')}</li>
            <li>{ti('text4')}</li>
          </ul>
          <p>{ti('text5')}</p>
          <p>{ti('text5-1')}</p>
          <p>{ti('text6')}</p>
        </div>
        <div className={bottomText}>
          <p className={twMerge('text-[#969696] font-light ', bottomText)}>{tph('text3')}</p>
          <p className='font-light'>{tph('text1')}</p>
          <p className='font-light'>{tph('text4')}</p>
          <p className='font-light'>{tph('text5')}</p>
        </div>
      </div>
    </>
  )
}

export default memo(InviteRule)
