export async function generateMetadata({ params }: { params?: any }) {
  try {
    const metadata: any = {
      vi: 'Không tìm thấy trang',
      en: 'Page not found'
    }
    return {
      title: metadata[params.locale || 'vi'] || metadata.en
    }
  } catch (error) {
    console.log(error)
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
