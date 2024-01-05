'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { Add, Global, SearchNormal1 } from 'iconsax-react'

import { useGetAllQueryParams } from '@/hooks/useGetAllQueryParams'
import { normalizeKeyword } from '@/utils'
import { langs } from '@/constants'

function LangsComp() {
  const t = useTranslations('Navbar')
  const locale = useLocale()

  const router = useRouter()
  const pathName = usePathname()
  const allQueryParams: any = useGetAllQueryParams()

  const [isOpen, setIsOpen] = useState(false)
  const [lang, setLang] = useState<any>(langs.find((i) => i.code === locale))

  const [searchLang, setSearchLang] = useState('')

  const _HandleChangeLang = (value?: any) => {
    setLang(value)

    setIsOpen(false)

    const arrayUrl = pathName?.split('/')
    const urlReplace = arrayUrl
      .map((item) => (item === arrayUrl[1] ? value.code : item))
      .join('/')

    const queryString = Object.keys(allQueryParams)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(allQueryParams[key])}`,
      )
      .join('&')

    router.replace(urlReplace + (queryString !== null ? `?${queryString}` : ''), {
      scroll: false,
    })
  }

  useEffect(() => {
    isOpen && !!searchLang?.length && setSearchLang('')
  }, [isOpen])

  const _HandleScroll = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', _HandleScroll)

    return () => {
      window.removeEventListener('scroll', _HandleScroll)
    }
  }, [])
  return (
    <>
      <div className='hidden lg:block '>
        <Popover
          placement='bottom-end'
          isOpen={isOpen}
          onOpenChange={(open: any) => setIsOpen(open)}
          classNames={{
            content: 'p-[16px] rounded-none',
          }}
        >
          <PopoverTrigger>
            <button className='flex h-[44px] cursor-pointer items-center space-x-6 divide-x-1 rounded-[44px] bg-[#F8F8F8] p-[10px] px-5 hover:opacity-80 focus:outline-none active:opacity-100'>
              <div className='flex items-center gap-2 text-[#646464]'>
                <Global size={24} className='font-semibold' />
                <span className='text-lg uppercase'>{lang?.code}</span>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              isIconOnly
              onPress={() => setIsOpen(false)}
              variant='light'
              className='absolute right-0 top-0 h-[48px] w-[56px]'
            >
              <Add className='rotate-45 text-base-black-1' size={24} />
            </Button>
            <div className='col-span-1 flex flex-col gap-[8px]'>
              <div className='flex flex-col justify-between gap-[16px]'>
                <h5 className='text-lg font-bold leading-normal text-primary-blue'>
                  {t('language')}
                </h5>
                <Input
                  variant='underlined'
                  value={searchLang}
                  onChange={(e: any) => {
                    setSearchLang(e.target.value)
                  }}
                  placeholder='Search'
                  startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
                  classNames={{
                    base: 'w-full',
                    input: 'text-lg text-[#C9C9C9]',
                    inputWrapper: 'h-[40px] pl-[12px]',
                    innerWrapper: 'gap-[4px]',
                  }}
                />
              </div>
              <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
                {langs
                  .filter((item) =>
                    normalizeKeyword(item.label).includes(normalizeKeyword(searchLang)),
                  )
                  .map((item) => (
                    <button
                      onClick={() => _HandleChangeLang(item)}
                      disabled={!item.active}
                      key={item.code}
                      className={`${
                        lang === item
                          ? 'bg-primary-blue-2 text-primary-blue'
                          : 'hover:bg-base-gray disabled:hover:bg-transparent'
                      } flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-3 text-left text-lg`}
                    >
                      <span>{item.symbol}</span>
                      <span className={`${item.active ? '' : 'text-black/30'}`}>
                        {item.label}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className='mb:pb-0 block w-full pb-80 lg:hidden'>
        <div className=' overflow-y-scroll'>
          <div className='flex flex-col justify-between gap-[16px]'>
            <h5 className='text-lg font-normal text-primary-blue py-3'>
              {t('language')}
            </h5>
            <Input
              variant='underlined'
              value={searchLang}
              onChange={(e: any) => {
                setSearchLang(e.target.value)
              }}
              placeholder='Search'
              startContent={<SearchNormal1 size={24} className='text-[#C9C9C9]' />}
              classNames={{
                base: 'w-full',
                input: 'text-lg text-[#C9C9C9]',
                inputWrapper: 'h-[40px] pl-[12px]',
                innerWrapper: 'gap-[4px]',
              }}
            />
          </div>
          <div className='grid max-h-[400px] grid-cols-1 gap-1 overflow-y-scroll py-2'>
            {langs
              .filter((item) =>
                normalizeKeyword(item.label).includes(normalizeKeyword(searchLang)),
              )
              .map((item) => (
                <button
                  onClick={() => _HandleChangeLang(item)}
                  disabled={!item.active}
                  key={item.code}
                  className={`${
                    lang === item
                      ? 'bg-primary-blue-2 text-primary-blue'
                      : 'hover:bg-base-gray disabled:hover:bg-transparent'
                  } flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-6 text-left text-lg`}
                >
                  <span>{item.symbol}</span>
                  <span className={`${item.active ? '' : 'text-black/30'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default LangsComp
