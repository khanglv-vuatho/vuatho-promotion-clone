'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Default = () => {
  const router = useRouter()

  useEffect(() => {
    // Function to detect the device and OS and redirect
    const detectAndRedirect = () => {
      // Ensure this code does not run on server-side
      if (typeof window !== 'undefined') {
        const userAgent = window.navigator.userAgent

        // iOS detection
        if (/iPad|iPhone|iPod|Macintosh|MacBook/.test(userAgent)) {
          window.location.href =
            'https://apps.apple.com/vn/app/vua-th%E1%BB%A3-si%C3%AAu-k%E1%BA%BFt-n%E1%BB%91i/id6467541777?l=vi'
          router.replace('/')
        }
        // Android detection
        else {
          window.location.href =
            'https://play.google.com/store/apps/details?id=com.vuatho.mobile&pli=1'
          router.replace('/')
        }
      }
    }

    detectAndRedirect()
  }, [router])

  return <div className='pt-[80px]'>Redirecting to Mobile Store...</div>
}

export default Default
