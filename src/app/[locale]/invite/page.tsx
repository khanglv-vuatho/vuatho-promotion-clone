import { useTranslations } from 'next-intl'
import { GuidelinesPromotion, Hero, ProtocolsPromotion } from '..'

function InviteServiceProviders() {
  const t = useTranslations('Promotion.Hero')
  return (
    <div className='flex flex-col gap-[40px] py-[70px] md:gap-[100px] 3xl:pt-[80px] bg-[url("/promotion/bg.webp")] bg-cover bg-no-repeat bg-center'>
      <Hero
        title1={t('text1-1')}
        title2={t('text2-1')}
        desc={t('text3-1')}
        thumb='/promotion/hero2.png'
        thumb1='/promotion/invite-number1.png'
        thumb2='/promotion/number2.png'
        thumb3='/promotion/number3.png'
        inviteText={t('text7')}
      />
      <ProtocolsPromotion />
      <GuidelinesPromotion />
    </div>
  )
}

export default InviteServiceProviders
