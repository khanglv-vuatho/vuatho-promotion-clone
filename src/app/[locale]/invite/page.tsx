'use client'

import { useTranslations } from 'next-intl'
import { GuidelinesPromotion, Hero, ProtocolsPromotion } from '..'
import { memo } from 'react'

function InviteServiceProviders() {
  const t = useTranslations('Promotion.Hero')
  return (
    <div className='flex flex-col gap-[40px] py-[70px] md:gap-[100px] 3xl:pt-[80px] bg-[url("/promotion/bg.webp")] bg-cover bg-no-repeat bg-center'>
      <Hero
        thumb='/promotion/hero2.webp'
        thumb1='/promotion/invite-number1.webp'
        thumb2='/promotion/number2.webp'
        thumb3='/promotion/number3.webp'
        inviteText={t('text7')}
      />
      <ProtocolsPromotion />
      <GuidelinesPromotion />
    </div>
  )
}

export default memo(InviteServiceProviders)
