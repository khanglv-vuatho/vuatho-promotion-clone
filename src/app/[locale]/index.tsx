'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  Button,
  Checkbox,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Add,
  Add as AddIcon,
  HambergerMenu,
  Location as LocationIcon,
  Sms as MailIcon,
  HambergerMenu as MenuIcon,
  Call as PhoneIcon,
} from 'iconsax-react'

import { FacebookIcon, LinkedinIcon, YoutubeIcon } from '@/components/Icons'
import ImageFallback from '@/components/ImageFallback'
// import LangsComp from '@/components/LangsComp'

import { AndroidBtn, IosBtn } from '@/components/Download'
import { HeaderWrapper, Logo } from '@/components/Header'
import InviteRule from '@/components/InviteRule'
import LangsComp from '@/components/LangsComp'
import { DefaultModal } from '@/components/Modal'
import { ToastComponent } from '@/components/Toast'
import instance from '@/services/axiosConfig'
import './promotion.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

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
      link: 'https://www.youtube.com/@Vuatho.official/',
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
    //   link: 'https://www.instagram.com/vuatho.official/',
    // },
    {
      id: 'Linkedin',
      icon: <LinkedinIcon size={20} />,
      link: 'https://www.linkedin.com/company/vuatho-vn/',
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
              className='h-[60px] w-[84px]'
            />
          </div>
          <p className='font-light text-base-black-1'>{t('text1')}</p>
        </div>
        <div className='flex flex-col gap-5'>
          <p className='font-light text-base-black-1'>{t('text2')}</p>
          <div className='flex w-full items-center justify-between gap-5 md:justify-normal'>
            {socialNetworkList.map((e) => (
              <a rel='noopener' key={e.id} href={e.link} target='_blank' title={e.id}>
                <div className='flex items-center gap-2'>
                  <span>{e.icon}</span>
                  <span className='font-light text-base-black-1'>{e.id}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className='col-span-1 flex flex-col gap-[14px] font-light text-base-black-1 lg:col-span-3'>
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
          <span className=''>info@vuatho.com</span>
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

  const openMenu = useSelector((state: any) => state.openMenu)

  const dispatch = useDispatch()

  const pathName = usePathname()
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const isInvite = pathName.includes('invite')

  type TPromotions = {
    id: number
    title: string
    url: string
  }

  const promotions: TPromotions[] = [
    { id: 1, title: td('title1'), url: `/${locale}/invite` },
    { id: 2, title: td('title2'), url: `/${locale}` },
  ]

  type TMenuPopup = { title: string; url: string; id: number }

  const menuPopup: TMenuPopup[] = [
    { id: 1, title: tt('text1'), url: '/' },
    { id: 2, title: tt('text2'), url: 'https://vuatho.com' },
    {
      id: 3,
      title: tt('text3'),
      url: isInvite ? 'invite/rule' : 'rule',
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

  const _HandleClickMenuMobile = (item: TPromotions) => {
    _HandleToggleMenu()
    router.replace(`${item.url}`)
  }

  const _HandleScroll = () => {
    setIsOpen(false)
  }

  const _HandleNavigate = (item: TMenuPopup) => {
    setIsOpen(false)
    console.log(item.url)
    router.replace(`/${locale}/${item.url}`)
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

  return (
    <>
      <div className='bg-white rounded-full px-[10px] py-2 lg:flex gap-5 items-center shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)] hidden'>
        <Link
          replace
          href={`/${locale}`}
          className={`${
            !isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'
          } px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
        >
          {t('text1')}
        </Link>
        <Link
          replace
          href={`${locale}/invite`}
          className={`${
            isInvite ? 'bg-primary-yellow' : 'bg-[#F8F8F8]'
          } px-5 py-2 rounded-full flex items-center justify-center font-semibold`}
        >
          {t('text1-1')}
        </Link>
        <LangsComp />
      </div>
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
              <HambergerMenu />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className='rounded-[20px] bg-white flex flex-col items-end'>
              {menuPopup.map((item) => {
                if (item.id === 2) {
                  return (
                    <div className='w-full p-5 text-end' key={item.id}>
                      <Link href={item.url} target='_blank' rel='noopener noreferrer'>
                        {item.title}
                      </Link>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={item.id}
                      className='w-full text-end cursor-pointer'
                      onClick={() => _HandleNavigate(item)}
                    >
                      <div className='p-5'>{item.title}</div>
                    </div>
                  )
                }
              })}
              <div className='p-5 flex flex-col gap-2 items-end'>
                <div className='flex items-center justify-between gap-2'>
                  <p className=''>0912 426 404</p>
                  <div className=''>
                    <ImageFallback
                      alt='zalo'
                      src={'/logo/zalo.png'}
                      width={24}
                      height={24}
                      className='size-6'
                    />
                  </div>
                </div>
                <div>
                  <ImageFallback
                    src={'/promotion/qr-zalo.png'}
                    alt='qr-zalo'
                    height={80}
                    width={80}
                    className='size-20'
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div
        className='menu-mobile block transition lg:hidden '
        onClick={_HandleToggleMenu}
      >
        {openMenu ? (
          <AddIcon size={32} className='rotate-45 cursor-pointer text-text transition' />
        ) : (
          <div className='flex items-center gap-2 md:gap-5'>
            <MenuIcon size={32} className='cursor-pointer text-text transition' />
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
              <div
                onClick={() => _HandleClickMenuMobile(item)}
                className='w-full cursor-pointer py-3 text-lg text-base-black-1'
                key={item.id}
              >
                {item.title}
              </div>
            ))}
            <LangsComp />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

type THero = {
  title1: string
  title2: string
  desc: string
  thumb: string
  thumb1: string
  thumb2: string
  thumb3: string
  inviteText?: string
}

export const Hero: React.FC<THero> = ({
  title1,
  title2,
  desc,
  thumb,
  thumb1,
  thumb2,
  thumb3,
  inviteText,
}) => {
  const t = useTranslations('Promotion.Hero')
  const td = useTranslations('Promotion.Toast')
  const tf = useTranslations('Promotion.Form')
  const th = useTranslations('Promotion.placeHolder')
  const tt = useTranslations('Promotion.PromotionsHeader.RightHeader')

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const initalInfoCustomer = {
    phone: '',
    otp: '',
  }

  const initalErrorInfoCustomer = { phone: false, otp: false }

  const [infoCustomer, setInfoCustomer] = useState(initalInfoCustomer)
  const [errorInfoCustomer, setErrorInfocustomer] = useState(initalErrorInfoCustomer)

  const [isSelected, setIsSelected] = useState(false)

  const [onSending, setOnSending] = useState(false)
  const [onFetchingOtp, setOnFetchingOtp] = useState(false)

  const _HandleChangeValue = (type: string, value: any) => {
    setInfoCustomer({ ...infoCustomer, [type]: value?.target?.value })
  }

  const _HandleSubmit = (e: any) => {
    e.preventDefault()
    const checkError = {
      phone: infoCustomer.phone === '',
      otp: infoCustomer.otp === '',
      checked: !isSelected,
    }
    console.log(checkError)

    setErrorInfocustomer(checkError)

    if (checkError.checked === true) {
      ToastComponent({
        message: td('text1'),
        type: 'error',
      })
    } else if (Object.values(checkError).some((item) => item === true)) {
      ToastComponent({
        message: td('text2'),
        type: 'error',
      })
    } else {
      //send api
      setOnSending(true)
    }
  }

  const _HandeSending = async () => {
    try {
      // const { data } = await instance.post('/login', infoCustomer)
      setInfoCustomer(initalInfoCustomer)
      setIsSelected(false)
    } catch (error) {
      console.log(error)

      ToastComponent({
        message: td('text3'),
        type: 'error',
      })
    } finally {
      setOnSending(false)
    }
  }

  const _HandleGetOtp = async () => {
    try {
      const { data } = await instance.post('/otp', {
        phone: infoCustomer.phone,
      })
    } catch (error) {
      console.log(error)
      ToastComponent({
        message: td('text6'),
        type: 'warning',
      })
    } finally {
      setOnFetchingOtp(false)
    }
  }

  const _HandleOtp = async () => {
    if (infoCustomer.phone === '') {
      ToastComponent({
        message: td('text4'),
        type: 'error',
      })
    } else if (infoCustomer.phone.length !== 10) {
      ToastComponent({
        message: td('text5'),
        type: 'error',
      })
    } else {
      setOnFetchingOtp(true)
    }
  }
  useEffect(() => {
    onFetchingOtp && _HandleGetOtp()
  }, [onFetchingOtp])

  useEffect(() => {
    onSending && _HandeSending()
  }, [onSending])

  return (
    <>
      <h3 className='ct-text-border text-primaryYellow text-2xl md:text-4xl uppercase font-bold px-2 md:px-0 md:text-center mt-10 md:hidden'>
        {inviteText ? tt('title1') : tt('title2')}
      </h3>
      <CustomSlider thumb1={thumb1} thumb2={thumb2} thumb3={thumb3} />
      <div className='ct-container flex-col gap-10'>
        <div className='grid grid-cols-5 gap-10 items-center'>
          <div className='hidden md:flex md:col-span-3 px-10 flex-col gap-5 col-span-5'>
            <h3 className='ct-text-border text-primaryYellow text-2xl md:text-4xl uppercase font-bold text-center hidden mt-10 md:block'>
              {inviteText ? tt('title1') : tt('title2')}
            </h3>
            <ImageFallback
              src={thumb}
              alt=''
              width={773}
              height={491}
              className='object-contain'
            />
            <p className='text-center text-xl text-base-black-1 font-medium'>
              {inviteText ? inviteText : t('text3')}
            </p>
          </div>
          <div className='md:col-span-2 col-span-5'>
            <form
              onSubmit={(e) => _HandleSubmit(e)}
              className='bg-white p-4 flex flex-col gap-5 rounded-[20px]'
            >
              <h5 className=''>{t('text6')}</h5>
              <div>
                <Input
                  variant='bordered'
                  value={infoCustomer.phone}
                  onChange={(e: any) => _HandleChangeValue('phone', e)}
                  placeholder={th('text1')}
                  classNames={{
                    inputWrapper:
                      'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-[16px]',
                  }}
                />
              </div>
              <div className='flex items-center gap-2'>
                <Input
                  variant='bordered'
                  value={infoCustomer.otp}
                  onChange={(e: any) => _HandleChangeValue('otp', e)}
                  placeholder={th('text2')}
                  classNames={{
                    inputWrapper:
                      'border-[#E1E1E1] data-[hover=true]:border-[#E1E1E1] group-data-[focus=true]:border-[#E1E1E1] border-1 h-[44px] pl-[16px]',
                  }}
                />
                <Button className='bg-primary-blue text-white h-11' onPress={_HandleOtp}>
                  {tf('text3')}
                </Button>
              </div>
              <div className='border-1 border-[#E1E1E1] rounded-2xl p-4 flex items-center gap-4'>
                <Checkbox
                  isSelected={isSelected}
                  onValueChange={setIsSelected}
                  classNames={{
                    base: 'p-0 pl-2',
                    icon: 'khang1',
                    label: 'khang2',
                    wrapper: 'after:bg-[#FCB713]',
                  }}
                >
                  <div className=''>
                    {tf('text1')}{' '}
                    <span
                      className='underline font-semibold cursor-pointer'
                      onClick={() => onOpen()}
                    >
                      {tf('text2')}
                    </span>
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
                            <Add className='rotate-45 text-base-black-1 ' size={32} />
                          </Button>
                          <div className='flex flex-col gap-2 w-[80%] md:w-auto'>
                            <h3 className='text-primary-blue text-lg md:text-2xl font-bold'>
                              Thể lệ chương trình
                            </h3>
                            <p className='text-[#FCB713] text-lg md:text-2xl font-bold'>
                              Nhập hội Vua Thợ - Cơ hội rinh Wave RSX
                            </p>
                          </div>
                          <div className='h-full overflow-auto'>
                            <InviteRule primaryText='text-base-black-1' />
                          </div>
                        </div>
                      }
                    />
                  </div>
                </Checkbox>
              </div>
              <Button
                className='bg-primaryYellow p-4'
                onClick={(e) => _HandleSubmit(e)}
                type='submit'
              >
                {tf('text4')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export const ProtocolsPromotion = () => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

  const listProtocols = [
    {
      desc: (
        <div className='md:text-xl'>
          <span
            className='underline font-semibold cursor-pointer'
            onClick={() => onOpen()}
          >
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
                className='w-full'
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
          <div className='text-base-black-1 flex flex-col gap-5 relative'>
            <Button
              isIconOnly
              radius='full'
              onPress={onClose}
              variant='light'
              className=' absolute right-0 top-0 h-[48px] flex-shrink-0 w-[48px] min-w-[unset]'
            >
              <Add className='rotate-45 text-base-black-1 ' size={32} />
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
              <div className='mt-5 md:block hidden'>
                <p>{t('text9')}</p>
                <div className='w-full'>
                  <ImageFallback
                    src={'/promotion/QR.png'}
                    alt='QR'
                    width={326}
                    height={326}
                    className='w-full'
                  />
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  )
}

export const GuidelinesPromotion = () => {
  const t = useTranslations('Promotion.ProtocolsPromotion')
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
            />
          </div>
        </div>
        <div className='order-1 md:order-2'>
          <div className='bg-white p-2 md:p-5 flex flex-col gap-2 items-center rounded-[10px]'>
            <h4 className='font-bold text-xl md:text-3xl text-primaryYellow'>
              {t('text17')}
            </h4>
            <p className=''>{t('text18')}</p>
          </div>
          <div className=''>
            <ImageFallback
              src={'/promotion/number1.png'}
              alt=''
              width={300}
              height={340}
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
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const CustomSlider = ({
  thumb1,
  thumb2,
  thumb3,
}: {
  thumb1: string
  thumb2: string
  thumb3: string
}) => {
  return (
    <div className='relative col-span-5 mt-[40px] flex min-h-[300px] justify-center overflow-hidden md:hidden'>
      <div className='rank1 absolute'>
        <ImageFallback
          src={thumb1}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
      <div className='rank2 absolute'>
        <ImageFallback
          src={thumb3}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
      <div className='rank3 absolute'>
        <ImageFallback
          src={thumb2}
          alt='number1'
          width={300}
          height={310}
          className='h-auto w-72'
        />
      </div>
    </div>
  )
}
