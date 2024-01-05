import { useTranslations } from 'next-intl'
import { GuidelinesPromotion, Hero, ProtocolsPromotion } from '.'

function Promotion() {
  const t = useTranslations('Promotion.Hero')

  return (
    <div className='flex flex-col gap-[40px] md:gap-[100px] pt-[70px] 3xl:py-[80px] bg-[url("/promotion/bg.webp")] bg-cover bg-no-repeat bg-center'>
      <Hero
        title1={t('text1')}
        title2={t('text2')}
        desc={t('text3')}
        thumb='/promotion/hero1.png'
        thumb1='/promotion/number1.png'
        thumb2='/promotion/number2.png'
        thumb3='/promotion/number3.png'
      />
      <ProtocolsPromotion />
      <GuidelinesPromotion />
    </div>
  )
}

export default Promotion
