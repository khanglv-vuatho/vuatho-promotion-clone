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
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index + 1) * 0.1 }}
                  key={item?.time?.public_at}
                  className='rounded-[20px] bg-white p-3 md:p-5 flex flex-col gap-5 min-h-[300px] max-w-[400px] min-w-[90%] md:max-w-[820px] mx-auto'
                >
                  <h4 className='text-primary-blue text-2xl font-bold'>
                    {t('text31')} {item?.time?.round} - {t('text32')}{' '}
                    {item?.time?.public_at}
                  </h4>
                  <div className='flex flex-col gap-10'>
                    {item?.listUserWinners?.map((item: any, index: number) => (
                      <div key={item.name} className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between md:grid md:grid-cols-3 gap-4 '>
                          <div className='flex items-center gap-2'>
                            <div>
                              <ImageFallback
                                src={`/promotion/rank${item.rank}.png`}
                                alt={`image-${item.rank}`}
                                height={100}
                                width={100}
                                className='h-[45px] w-[35px] pointer-events-none select-none'
                              />
                            </div>
                            <p className='md:text-xl font-normal max-w-none md:max-w-[140px] lg:max-w-none'>
                              {item.name}
                            </p>
                          </div>
                          <div className='w-full hidden md:flex items-center justify-center'>
                            <div className='items-center justify-center flex gap-4'>
                              {isInvite ? (
                                item.bingo.map((item: any) => (
                                  <div
                                    key={item}
                                    className='items-center justify-center flex gap-4'
                                  >
                                    <p className='size-[40px] bg-[#F8F8F8] flex items-center justify-center rounded-full text-[#405AB7] font-semibold'>
                                      {item}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <div className='px-4 py-2 border-1 border-primaryYellow rounded-lg flex items-center'>
                                  <p className='text-xl font-semibold'>{item?.bingo}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className='flex items-center gap-2 justify-end'>
                            <p className={`${!isInvite && 'hidden md:block'}`}>
                              {listRank[index].title}
                            </p>
                            <div className='hidden lg:block'>
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
                        <div
                          className={`md:hidden flex items-center justify-center gap-4`}
                        >
                          <div className='items-center justify-center flex gap-4'>
                            {isInvite ? (
                              item.bingo.map((item: any) => (
                                <div
                                  key={item}
                                  className='items-center justify-center flex gap-4'
                                >
                                  <p className='size-[40px] bg-[#F8F8F8] flex items-center justify-center rounded-full text-[#405AB7] font-semibold'>
                                    {item}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <div className='px-4 py-2 border-1 border-primaryYellow rounded-lg flex items-center'>
                                <p className='text-xl font-semibold'>{item?.bingo}</p>
                              </div>
                            )}
                          </div>
                          {!isInvite && (
                            <div className='flex items-center gap-2 justify-end'>
                              <p>{listRank[index].title}</p>
                              <div className='hidden lg:block'>
                                <ImageFallback
                                  src={listRank[index].thumb}
                                  alt=''
                                  height={'72'}
                                  width={'100'}
                                  className='md:max-w-[100px] md:max-h-[80px] pointer-events-none select-none'
                                />
                              </div>
                            </div>
                          )}
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
