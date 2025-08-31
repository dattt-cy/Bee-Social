'use client'
import Link from 'next/link'
import Image from 'next/image'
import notfound from '@/assets/404.jpg'

export default function NotFound() {
  return (
    <div style={{ position: 'absolute', zIndex: 9999999, width: '84%', height: '100%', top: 0, right: '2px' }}>
      <Image src={notfound} alt='404' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}
