'use client'

import { motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import ImageFallback from '@/components/ImageFallback'

export const WinderList = ({ data, onFetching }: { data: any; onFetching: boolean }) => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const td = useTranslations('Promotion.menuPopup')

  const [onLoading, setOnLoading] = useState(true)

  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  const listRank = [
    {
      title: isInvite ? '1 Wave RSX F1' : '1 Yamaha PG-1',
      thumb: isInvite ? '/promotion/invite-number1.png' : '/promotion/number1.png',
    },
    {
      title: t('text16'),
      thumb: '/promotion/number2.png',
    },
    {
      title: t('text20'),
      thumb: '/promotion/number3.png',
    },
  ]

  useEffect(() => {
    !onFetching && setOnLoading(false)
  }, [onFetching])

  return (
    <div className='py-[110px] 3xl:py-[120px] bg-[url("/promotion/bg.webp")] bg-cover bg-no-repeat bg-center'>
      <div className='ct-container'>
        <h3 className='ct-text-border text-[#FF4343] text-2xl md:text-4xl uppercase text-center font-bold'>
          {td('text1')}
        </h3>
        {onLoading && !!data.length ? (
          <div className='rounded-[20px] bg-white animate-pulse min-h-[300px] mt-5' />
        ) : (
          <div className='mt-5 flex flex-col gap-5'>
            {!!data.length ? (
              data?.map((item: any, index: number) => (
                <motion.div
                  initial={{ y: 100 * (index + 1), opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index + 1) * 0.1 }}
                  key={item?.time?.public_at}
                  className='rounded-[20px] bg-white p-5 flex flex-col gap-5 min-h-[300px] max-w-[400px] min-w-[90%] md:min-w-full md:max-w-none mx-auto'
                >
                  <h4 className='text-primary-blue text-2xl font-bold'>
                    {t('text31')} {item?.time?.round} - {t('text32')}{' '}
                    {item?.time?.public_at}
                  </h4>
                  <div className='flex flex-col gap-10'>
                    {item?.listUserWinners?.map((item: any, index: number) => (
                      <div
                        key={item.name}
                        className='flex flex-col items-center justify-between md:grid md:grid-cols-3 gap-4 *:flex *:flex-col *:md:flex-row *:w-full *:md:h-[72px] *:items-center *:gap-2 last:*:md:justify-end first:*:flex-row'
                      >
                        <div>
                          <div>
                            <ImageFallback
                              src={`/promotion/rank${item.rank}.png`}
                              alt={`image-${item.rank}`}
                              height={38}
                              width={30}
                              className='h-[38px] w-[30px] pointer-events-none select-none'
                            />
                          </div>
                          <p className='text-xl font-normal max-w-none md:max-w-[150px] lg:max-w-none'>
                            {item.name}
                          </p>
                        </div>
                        <div className='justify-start md:justify-center !flex-row'>
                          {isInvite ? (
                            item.bingo.map((item: any) => (
                              <div
                                key={item}
                                className='size-[40px] lg:size-[48px] flex-shrink-0 rounded-full bg-primaryYellow text-xl flex items-center justify-center'
                              >
                                {item}
                              </div>
                            ))
                          ) : (
                            <div className='w-full py-3 text-xl bg-primaryYellow text-center rounded-full md:max-w-[70%] mx-auto'>
                              <p>{item?.bingo}</p>
                            </div>
                          )}
                        </div>
                        <div className='!items-start md:!items-center'>
                          <p className='block md:hidden lg:block'>
                            {listRank[index].title}
                          </p>
                          <div>
                            <ImageFallback
                              src={listRank[index].thumb}
                              alt=''
                              height={'72'}
                              width={'100'}
                              className='md:max-w-[100px] md:max-h-[80px] pointer-events-none select-none'
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className='rounded-[20px] bg-white animate-pulse min-h-[300px]' />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(WinderList)
