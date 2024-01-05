import ImageFallback from '@/components/ImageFallback'
import InviteRule from '@/components/InviteRule'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

export const BodyRule = () => {
  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  const t = useTranslations('Promotion.Hero')

  return (
    <div className='py-[110px] 3xl:py-[120px] bg-[url("/promotion/bg.webp")] bg-cover bg-no-repeat bg-center'>
      <div className='ct-container'>
        <div className='p-4 md:p-10 rounded-[20px] bg-gradient-to-b from-[#0D6DDE] to-[#A0CCFF]'>
          <div className='flex flex-col gap-5'>
            <h3 className='md:text-4xl text-2xl text-white font-bold text-center'>
              {t('text9')}
            </h3>
            <div className='bg-gradient-to-br from-[#F4BF2B] to-[#FFF27E] w-full rounded-full px-4 py-2 md:px-6 md:py-4 text-center text-2xl md:text-4xl text-primary-blue'>
              <span>{isInvite ? t('text1-1') : t('text1')}</span>
              <span className='font-bold'>
                {isInvite ? `- ${t('text8')} ` : `- ${t('text2')}`}
              </span>
            </div>
            <InviteRule
              primaryText='text-white'
              step6={Step6()}
              bottomText='text-white font-semibold'
            />
            <div className='w-full'>
              <ImageFallback
                src={isInvite ? '/promotion/invite.png' : '/promotion/invite1.png'}
                alt=''
                width={2100}
                height={500}
                className='w-full pointer-events-none select-none'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Step6 = () => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  return (
    <div className='mt-10 border-1 border-[#0D6DDE] rounded-xl overflow-hidden divide-y-1 divide-[#0D6DDE] hidden md:block'>
      <div className='grid grid-cols-3 overflow-hidden *:text-primary-blue *:p-4 text-center bg-gradient-to-r from-[#F4BF2B] via-[#FFF07B] to-[#FFF27E] divide-x-1 divide-[#0D6DDE]'>
        <div className=''>
          <p className='font-bold text-xl uppercase'>{t('text25')}</p>
        </div>
        <div className='font-bold text-xl uppercase'>
          <p className='font-bold text-xl uppercase'>{t('text26')}</p>
        </div>
        <div className='font-bold text-xl uppercase '>
          <p className='font-bold text-xl uppercase '>{t('text27')}</p>
        </div>
      </div>
      <div className='grid grid-cols-3 text-center divide-x-1 divide-[#0D6DDE] *:bg-white *:text-primary-blue *:font-bold '>
        <div className='divide-y-1 divide-[#0D6DDE] *:h-1/3 *:flex *:gap-3 *:justify-center *:items-center *:p-4'>
          <div className=''>
            <div className=''>
              <ImageFallback
                src='/promotion/rank1.png'
                alt='rank1'
                width={45}
                height={54}
                className='pointer-events-none select-none'
              />
            </div>
            <p>{t('text17')}</p>
          </div>
          <div className=''>
            <div className=''>
              <ImageFallback
                src='/promotion/rank2.png'
                alt='rank2'
                width={45}
                height={54}
                className='pointer-events-none select-none'
              />
            </div>
            <p>{t('text15')}</p>
          </div>
          <div className='rounded-bl-xl'>
            <div className=''>
              <ImageFallback
                src='/promotion/rank3.png'
                alt='rank3'
                width={45}
                height={54}
                className='pointer-events-none select-none'
              />
            </div>
            <p>{t('text19')}</p>
          </div>
        </div>
        <div className='divide-y-1 divide-[#0D6DDE] *:h-1/3 *:flex *:gap-3 *:justify-center *:items-center *:p-4'>
          <div className=''>
            <p>{isInvite ? t('text28-1') : t('text28')}</p>
          </div>
          <div className=''>
            <p>{t('text29')}</p>
          </div>
          <div className=''>
            <p>{t('text30')}</p>
          </div>
        </div>
        <div className='divide-y-1 divide-[#0D6DDE] *:h-1/3 *:flex *:gap-3 *:justify-center *:items-center *:p-4'>
          <div className=''>
            <p>{t('text23')}</p>
          </div>
          <div className=''>
            <p>{t('text24')}</p>
          </div>
          <div className='rounded-br-xl'>
            <p>{t('text24')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
