'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { memo, useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Add as AddIcon,
  Call as CallIcon,
  HambergerMenu,
  Location as LocationIcon,
  Sms as MailIcon,
  HambergerMenu as MenuIcon,
  Call as PhoneIcon,
} from 'iconsax-react'

import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'

import { AndroidBtn, IosBtn } from '@/components/Download'
import { HeaderWrapper, Logo } from '@/components/Header'
import InviteRule from '@/components/InviteRule'
import LangsComp from '@/components/LangsComp'
import { DefaultModal } from '@/components/Modal'
import { useGetAllQueryParams } from '@/hooks/useGetAllQueryParams'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { twMerge } from 'tailwind-merge'
import './promotion.css'

export const PromotionsHeader = () => {
  return (
    <HeaderWrapper>
      <Logo />
      <RightHeader />
    </HeaderWrapper>
  )
}

export const PromotionsFooter = () => {
  const t = useTranslations('Promotion.PromotionsHeader')
  const socialNetworkList = [
    {
      id: 'Youtube',
      icon: <YoutubeIcon size={24} />,
      link: 'https://www.youtube.com/@Vuatho.official',
    },
    {
      id: 'Facebook',
      icon: <FacebookIcon size={20} />,
      link: 'https://www.facebook.com/vuathovietnam',
    },
    // {
    //   id: 'Tiktok',
    //   icon: <TiktokIcon size={20} />,
    //   link: '	https://www.tiktok.com/@vuatho.com',
    // },
    // {
    //   id: 'Instagram',
    //   icon: <InstaIcon size={24} />,
    //   link: 'https://www.instagram.com/vuatho.official',
    // },
    {
      id: 'Linkedin',
      icon: <LinkedinIcon size={20} />,
      link: 'https://www.linkedin.com/company/vuatho-vn',
    },
  ]
  return (
    <footer className='ct-container grid grid-cols-1 gap-[40px] py-10 lg:grid-cols-5 lg:py-20 bg-white'>
      <div className='col-span-1 flex flex-col gap-5 lg:col-span-2'>
        <div className='flex flex-col'>
          <div className=''>
            <ImageFallback
              src={'/logo/textLogo.webp'}
              alt='textLogo.webp'
              width={84}
              height={60}
              className='h-[60px] w-[84px] pointer-events-none select-none'
            />
          </div>
          <p className='font-light'>{t('text1')}</p>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-light'>{t('text2')}</p>
          <div className='flex w-full items-center justify-between gap-5 md:justify-normal'>
            {socialNetworkList.map((e) => (
              <a rel='noopener' key={e.id} href={e.link} target='_blank' title={e.id}>
                <div className='flex items-center gap-2'>
                  <span>{e.icon}</span>
                  <span className='font-light  '>{e.id}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-1 flex flex-col gap-[14px] font-light   lg:col-span-3'>
        <p className='text-[#969696] '>{t('text3')}</p>
        <div className='flex items-center gap-4'>
          <LocationIcon className='text-primary-blue' variant='Bold' />
          <span className=''>{t('text4')}</span>
        </div>
        <div className='flex items-center gap-4'>
          <PhoneIcon className='text-primary-blue' variant='Bold' />
          <span className=''>0912 426 404</span>
        </div>
        <div className='flex items-center gap-4'>
          <MailIcon className='text-primary-blue' variant='Bold' />
          <span className=''>admin@vuatho.com</span>
        </div>
      </div>
    </footer>
  )
}

const RightHeader = () => {
  const td = useTranslations('Promotion.PromotionsHeader.RightHeader')
  const tt = useTranslations('Promotion.menuPopup')
  const t = useTranslations('Promotion.Hero')

  const locale = useLocale()
  const allQueryParams: any = useGetAllQueryParams()

  const openMenu = useSelector((state: any) => state.openMenu)
  const infoUser = useSelector((state: any) => state.infoUser)

  const dispatch = useDispatch()
  const pathName = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const [isWebView, setIsWebview] = useState(false)

  const isInvite = pathName.includes('invite')

  const _handleCheckWebView = () => {
    const queryString = Object.keys(allQueryParams)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`,
      )
      .join('&')

    return queryString !== null ? `?${queryString}` : ''
  }

  type TPromotions = {
    id: number
    title: string
    url: string
  }

  const promotions: TPromotions[] = [
    {
      id: 1,
      title: td('title1'),
      url: `/${locale}/invite${_handleCheckWebView()}`,
    },
    { id: 2, title: td('title2'), url: `/${locale}` },
  ]

  type TMenuPopup = { title: string | React.ReactNode; url: string; id: number }

  const menuPopup: TMenuPopup[] = [
    {
      id: 1,
      title: tt('text1'),
      url: isInvite ? `/${locale}/invite/winners-list` : `/${locale}/winners-list`,
    },
    { id: 2, title: tt('text2'), url: 'https://vuatho.com' },
    {
      id: 3,
      title: tt('text3'),
      url: isInvite ? `/${locale}/invite/rule` : `/${locale}/rule`,
    },
    {
      id: 4,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>{tt('fanpage')} Vua Thợ</p>
          <div className='hidden lg:block'>
            <ImageFallback
              alt='fb'
              src={'/logo/fb.png'}
              width={24}
              height={24}
              className='size-6 pointer-events-none select-none'
            />
          </div>
        </div>
      ),
      url: 'https://www.facebook.com/vuathovietnam',
    },
    {
      id: 5,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>Zalo Vua Thợ</p>
          <div className='hidden lg:block'>
            <ImageFallback
              alt='zalo'
              src={'/logo/zalo.png'}
              width={24}
              height={24}
              className='size-6 pointer-events-none select-none'
            />
          </div>
        </div>
      ),
      url: 'https://zalo.me/622166130485793859',
    },
    {
      id: 5,
      title: (
        <div className='flex items-center lg:justify-end gap-2 w-full'>
          <p className='text-semibold'>0912 426 404</p>
          <div className='hidden lg:block'>
            <CallIcon
              variant='Bold'
              className='size-6 pointer-events-none select-none text-primaryYellow'
            />
          </div>
        </div>
      ),
      url: 'https://zalo.me/622166130485793859',
    },
  ]

  const menuVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transiton: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transiton: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const _HandleToggleMenu = () => {
    dispatch({ type: 'toggle_menu', payload: openMenu })
  }

  const _HandleScroll = () => {
    setIsOpen(false)
  }

  const _HandleCloseMenuMoblie = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', _HandleScroll)

    return () => {
      window.removeEventListener('scroll', _HandleScroll)
    }
  }, [])

  useEffect(() => {
    openMenu
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto')
  }, [openMenu])

  useEffect(() => {
    var is_uiwebview = navigator.userAgent.includes('WebView')
    setIsWebview(is_uiwebview)
  }, [])

  if (isWebView) {
    return null
  }

  return (
    <>
      <div className='bg-white rounded-full px-[10px] py-2 lg:flex gap-5 items-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] hidden'>
        <Link
          href={`/${locale}${_handleCheckWebView()}`}
          className={`${
            !isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'
          } px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
        >
          {t('text1')}
        </Link>
        <Link
          href={`/${locale}/invite${_handleCheckWebView()}`}
          className={`${
            isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'
          } px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
        >
          {t('text1-1')}
        </Link>
        <LangsComp />
      </div>

      {/* menu route */}
      <div className='lg:block hidden'>
        <Popover
          placement='bottom-end'
          isOpen={isOpen}
          onOpenChange={(open: any) => setIsOpen(open)}
          classNames={{
            content: 'rounded-[20px] p-0',
          }}
        >
          <PopoverTrigger>
            <div className='size-[60px] rounded-full bg-white flex items-center justify-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] cursor-pointer'>
              {!!infoUser.id ? (
                <ImageFallback
                  src={infoUser.thumb}
                  alt={`avatar-${infoUser.name}`}
                  height={58}
                  width={58}
                  className='size-[90%] rounded-full pointer-events-none select-none'
                />
              ) : (
                <HambergerMenu />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className='rounded-[20px] bg-white py-2 flex flex-col items-end min-w-[240px]'>
              {menuPopup.map((item) => {
                return (
                  <LinkItem
                    key={item.id}
                    item={item}
                    handleClick={_HandleCloseMenuMoblie}
                  />
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {/* menu mobile */}

      <div
        className='menu-mobile flex items-center gap-4 transition lg:hidden '
        onClick={_HandleToggleMenu}
      >
        <>{infoUser ? '' : ''}</>
        {openMenu ? (
          <AddIcon size={32} className='rotate-45 cursor-pointer text-text transition' />
        ) : (
          <div className='flex items-center gap-2 md:gap-5'>
            <MenuIcon size={32} className='cursor-pointer text-white transition' />
          </div>
        )}
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial='initial'
            animate='animate'
            exit='exit'
            variants={menuVariants}
            className='fixed bottom-0 left-0 right-0 top-[60px] z-10 flex h-[calc(100vh-60px)] origin-top flex-col items-start gap-1 bg-bg p-6'
          >
            {promotions.map((item) => (
              <Link
                href={`${item.url}`}
                className='w-full cursor-pointer py-3 text-lg'
                key={item.id}
                onClick={_HandleCloseMenuMoblie}
              >
                {item.title}
              </Link>
            ))}
            <div className='flex flex-col w-full'>
              {menuPopup.map((item) => {
                return (
                  <LinkItem
                    key={item.id}
                    item={item}
                    handleClick={_HandleCloseMenuMoblie}
                  />
                )
              })}
            </div>
            <LangsComp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

type THero = {
  thumb: string
  thumb1: string
  thumb2: string
  thumb3: string
  inviteText?: string
}

export const Hero: React.FC<THero> = memo(
  ({ thumb, thumb1, thumb2, thumb3, inviteText }) => {
    const t = useTranslations('Promotion.Hero')
    const tt = useTranslations('Promotion.PromotionsHeader.RightHeader')

    const [onFetching, setOnFetching] = useState(false)
    const [onLoading, setOnLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

    const pathName = usePathname()
    const isInvite = pathName.includes('invite')

    const allQueryParams: any = useGetAllQueryParams()

    const dispatch = useDispatch()

    const infoUser = useSelector((state: any) => state.infoUser)

    const isWebView = allQueryParams?.token && allQueryParams?.hideHeaderAndFooter

    const _HandleFetching = async () => {
      try {
        // const { data } = await instance.get('/promotion/info', {
        //   params: {
        //     allQueryParams?.token,
        //   },
        // })

        // dispatch({
        //   type: 'login',
        //   payload: {
        //     thumb: '/promotion/number1.png',
        //     name: 'Lương Vĩ Khang',
        //     phone: '0932456789',
        //     id: '3',
        //     listNumber: [
        //       ['12', '31', '45', '21', '42', '44'],
        //       ['12', '32', '35', '98', '33', '75'],
        //       ['12', '32', '12', '94', '86', '64'],
        //     ],
        //     code: '123456',
        //   },
        // })
        setIsVisible(isWebView)
      } catch (error) {
        console.log(error)
        setIsVisible(false)
      } finally {
        setOnFetching(false)
        setOnLoading(false)
      }
    }

    useEffect(() => {
      onFetching && _HandleFetching()
    }, [onFetching])

    // check exits token to call api
    useEffect(() => {
      if (!isWebView) {
        setOnLoading(false)
        return
      }

      setOnFetching(true)
    }, [isWebView])

    return (
      <>
        <h3 className='ct-text-border text-primaryYellow text-2xl md:text-4xl uppercase font-bold px-2 md:px-0 md:text-center mt-10 lg:hidden'>
          {inviteText ? (
            <>
              <span>{t('text1-1')} - </span>
              <span>{t('text2-1')}</span>
            </>
          ) : (
            <>
              <span>{t('text1')} - </span>
              <span>{t('text2')}</span>
            </>
          )}
        </h3>
        <div className='lg:hidden'>
          <CustomSlider
            thumb1={thumb1}
            thumb2={thumb2}
            thumb3={thumb3}
            style='md:flex lg:hidden'
          />
        </div>
        <div className='ct-container flex-col gap-10'>
          <div
            className={`${!!isVisible ? 'grid grid-cols-5' : ''}  gap-10 items-center`}
          >
            <div
              className={`hidden lg:flex lg:col-span-3 px-10 flex-col gap-5 col-span-5 ${
                !!isVisible ? '' : 'items-center'
              }`}
            >
              <h3 className='ct-text-border text-primaryYellow text-2xl lg:text-4xl uppercase font-bold text-center hidden mt-10 lg:block'>
                {inviteText ? (
                  <>
                    <span>{t('text1-1')} - </span>
                    <span>{t('text2-1')}</span>
                  </>
                ) : (
                  <>
                    <span>{t('text1')} - </span>
                    <span>{t('text2')}</span>
                  </>
                )}
              </h3>
              <ImageFallback
                src={thumb}
                alt=''
                width={773}
                height={491}
                className='object-contain pointer-events-none select-none'
              />
              <p className='text-center text-xl   font-medium'>
                {inviteText ? inviteText : t('text3')}
              </p>
            </div>
            {!!isVisible && (
              <div className='lg:col-span-2 col-span-5 lg:justify-end lg:flex'>
                {onLoading ? (
                  <div className='bg-white p-4 flex flex-col gap-5 rounded-[20px] lg:min-w-[400px] min-h-[300px] animate-pulse' />
                ) : (
                  <div className='bg-white p-4 flex flex-col gap-5 rounded-[20px] lg:min-w-[400px]'>
                    <h3 className='text-2xl text-primary-blue font-semibold'>
                      {t('text6')}
                    </h3>
                    <div className='flex items-center gap-2 py-2'>
                      <div className=''>
                        <ImageFallback
                          src={infoUser.thumb}
                          alt={`avtar-${infoUser.id}`}
                          height={44}
                          width={44}
                          className='size-[44px] rounded-full pointer-events-none select-none'
                        />
                      </div>
                      <p className='font-light'>{infoUser?.name}</p>
                    </div>
                    <div className='flex flex-col gap-4 '>
                      <p className='text-[#969696]'>
                        {isInvite ? 'Dãy số của bạn:' : 'Mã dự thưởng:'}
                      </p>
                      {isInvite ? (
                        <div className='flex flex-col gap-4'>
                          {!!infoUser?.listNumber?.length ? (
                            infoUser?.listNumber?.map(
                              (listnumber: any, index: number) => (
                                <div className='flex justify-between gap-4' key={index}>
                                  {listnumber?.map((number: any) => (
                                    <div
                                      className='bg-[#F8F8F8] size-[46px] flex items-center justify-center rounded-full text-primary-blue font-semibold'
                                      key={number}
                                    >
                                      {number}
                                    </div>
                                  ))}
                                </div>
                              ),
                            )
                          ) : (
                            <div className='rounded-[10px] bg-[#F8F8F8] h-[236px] flex items-center justify-center'>
                              <div className='flex flex-col gap-2 items-center'>
                                <p className=''>{t('text10')}</p>
                                <Button
                                  className='bg-[#FCB713] font-semibold w-fit px-5 py-2'
                                  radius='full'
                                  onPress={() => {
                                    onOpen()
                                  }}
                                >
                                  {t('text11')}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className='bg-[#F8F8F8] text-primary-blue text-4xl px-5 py-3 rounded-[10px]'>
                          {infoUser?.code}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <DefaultModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              hiddenHeader
              hiddenCloseBtn
              className=''
              modalBody={
                <div className='flex flex-col rounded-[20px] gap-4 md:gap-10 p-4 md:p-10 relative h-[80dvh]'>
                  <Button
                    isIconOnly
                    radius='full'
                    onPress={onClose}
                    variant='light'
                    className=' absolute right-[3%] top-[3%] h-[48px] flex-shrink-0 w-[48px] min-w-[unset]'
                  >
                    <AddIcon className='rotate-45   ' size={32} />
                  </Button>
                  <div className='flex flex-col gap-2 w-[80%] md:w-auto'>
                    <h3 className='text-primary-blue text-lg md:text-2xl font-bold'>
                      {t('text9')}
                    </h3>
                    <p className='text-[#FCB713] text-lg md:text-2xl font-bold'>
                      {isInvite ? t('text1-1') : t('text1')} -{' '}
                      {isInvite ? t('text2-1') : t('text2')}
                    </p>
                  </div>
                  <div className='h-full overflow-auto'>
                    <InviteRule primaryText=' ' />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </>
    )
  },
)

export const ProtocolsPromotion = memo(() => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const _HandleOpen = () => {
    isMobile
      ? window.open('https://vuatho.com/vi/qrcode-download-app', '_blank')
      : onOpen()
  }

  const listProtocols = [
    {
      desc: (
        <div className='md:text-xl'>
          <span className='underline font-semibold cursor-pointer' onClick={_HandleOpen}>
            {t('text10')}
          </span>{' '}
          {t('text11')}
        </div>
      ),
      thumb: 'ProtocolsPromotion1.png',
    },
    {
      desc: <p className='md:text-xl'>{t('text12')}</p>,
      thumb: 'ProtocolsPromotion2.png',
    },
    {
      desc: <p className='md:text-xl'>{t('text13')}</p>,
      thumb: 'ProtocolsPromotion3.png',
    },
  ]

  return (
    <div className='ct-container flex flex-col gap-5'>
      <h4 className='ct-text-border text-primaryYellow font-bold text-2xl md:text-4xl uppercase'>
        {t('title')}
      </h4>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {listProtocols.map((item, index) => (
          <div
            className='rounded-[20px] p-5 bg-white flex flex-col gap-4 md:gap-10'
            key={index}
          >
            <div className='flex flex-col gap-2'>
              <h5 className='text-primary-blue font-bold text-xl md:text-3xl'>
                {t('text6')} {index + 1}
              </h5>
              {item.desc}
            </div>
            <div className=''>
              <ImageFallback
                src={`/promotion/${item.thumb}`}
                alt='ProtocolsPromotion1'
                width={360}
                height={360}
                className='w-full pointer-events-none select-none'
              />
            </div>
          </div>
        ))}
      </div>
      <DefaultModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hiddenCloseBtn
        hiddenHeader
        className='max-w-[380px] md:max-w-[685px] p-6 pb-6'
        modalBody={
          <div className='  flex flex-col gap-5 relative'>
            <Button
              isIconOnly
              radius='full'
              onPress={onClose}
              variant='light'
              className=' absolute right-0 top-0 h-[48px] flex-shrink-0 w-[48px] min-w-[unset]'
            >
              <AddIcon className='rotate-45   ' size={32} />
            </Button>
            <h3 className='uppercase text-primary-blue text-2xl md:text-4xl font-semibold'>
              {t('text7')}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className=''>
                <p className='text-lg'>{t('text8')}</p>
                <div className='flex  gap-4 flex-col mt-2'>
                  <AndroidBtn style={'max-w-none'} />
                  <IosBtn style={'max-w-none'} />
                </div>
              </div>
              <div className='md:block hidden'>
                <p>{t('text9')}</p>
                <div className='max-w-[250px] max-h-[250px] size-[250px] p-2'>
                  <QRCode
                    value='https://vuatho.com/vi/qrcode-download-app'
                    size={250}
                    className='max-w-[250px] max-h-[250px] size-[250px]'
                  />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
})

export const GuidelinesPromotion = memo(() => {
  const t = useTranslations('Promotion.ProtocolsPromotion')

  const pathName = usePathname()
  const isInvite = pathName.includes('invite')

  return (
    <div className='ct-container flex flex-col gap-5 pb-20'>
      <h3 className='ct-text-border text-primary-blue uppercase text-2xl md:text-4xl font-bold'>
        {t('text14')}
      </h3>
      <div className='flex justify-between items-center md:flex-row flex-col gap-10'>
        <div className='flex flex-col gap-10 order-2 md:order-1'>
          <div className='bg-white p-2 md:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-primary-blue'>
              {t('text15')}
            </h4>
            <p className=''>{t('text16')}</p>
          </div>
          <div className=''>
            <ImageFallback
              src={'/promotion/number2.png'}
              alt=''
              width={300}
              height={112}
              className='pointer-events-none select-none'
            />
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <div className='bg-white p-2 md:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-primaryYellow'>
              {t('text17')}
            </h4>
            <p className=''>{isInvite ? t('text18-1') : t('text18')}</p>
          </div>
          <div className=''>
            <ImageFallback
              src={isInvite ? '/promotion/invite-number1.png' : '/promotion/number1.png'}
              alt=''
              width={300}
              height={340}
              className='pointer-events-none select-none'
            />
          </div>
        </div>
        <div className='flex flex-col gap-10 order-4'>
          <div className='bg-white p-2 xl:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-[#FF9D76]'>
              {t('text19')}
            </h4>
            <p className=''>{t('text20')}</p>
          </div>
          <div className=''>
            <ImageFallback
              src={'/promotion/number3.png'}
              alt=''
              width={300}
              height={112}
              className='pointer-events-none select-none'
            />
          </div>
        </div>
      </div>
    </div>
  )
})

export const CustomSlider = memo(
  ({
    thumb1,
    thumb2,
    thumb3,
    style,
  }: {
    thumb1: string
    thumb2: string
    thumb3: string
    style?: string
  }) => {
    console.log('render')

    return (
      <div
        className={twMerge(
          'relative top-20 md:top-32 col-span-5 mt-[40px] flex min-h-[360px] justify-center overflow-x-hidden md:hidden pb-0 md:pb-0',
          style,
        )}
      >
        <div className='rank1 absolute'>
          <ImageFallback
            src={thumb1}
            alt='number1'
            width={300}
            height={310}
            className='h-auto w-72 pointer-events-none select-none'
          />
        </div>
        <div className='rank2 absolute'>
          <ImageFallback
            src={thumb3}
            alt='number3'
            width={300}
            height={310}
            className='h-auto w-72 pointer-events-none select-none'
          />
        </div>
        <div className='rank3 absolute'>
          <ImageFallback
            src={thumb2}
            alt='number2'
            width={300}
            height={310}
            className='h-auto w-72 pointer-events-none select-none'
          />
        </div>
      </div>
    )
  },
)

const LinkItem = memo(({ item, handleClick }: { item: any; handleClick: any }) => {
  return (
    <Link
      href={item.url}
      key={item.id}
      className='w-full cursor-pointer text-lg lg:text-base lg:text-right'
      target={item.url.includes('http') ? '_blank' : ''}
      rel='noopener noreferrer'
      onClick={handleClick}
    >
      <div className='py-3 lg:pr-4'>{item.title}</div>
    </Link>
  )
})
