import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { NextIntlClientProvider, useLocale } from 'next-intl'
import { Lexend } from 'next/font/google'

import { locales } from '@/constants'

import './globals.css'
import { PromotionsFooter, PromotionsHeader } from '.'
import { ToastContainer } from 'react-toastify'
import { Logo } from '@/components/Header'

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'Promotion',
  description: 'Promotion',
}

const timeZone = 'Asia/Ho_Chi_Minh'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: any
}) {
  const { locale } = params

  const isValidLocale = locales.some((cur) => cur === locale)

  if (!isValidLocale) {
    return redirect(`/vi/${locale}`)
  }

  let messages

  try {
    messages = (await import(`../../../messages/${locale}.json`)).default
  } catch (error) {
    console.log(error)
  }
  return (
    <html lang={locale}>
      <body className={lexend.className}>
        <ToastContainer />
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
          <PromotionsHeader />
          {children}
          <PromotionsFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
