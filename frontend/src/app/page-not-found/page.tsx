'use client'
import React from 'react'
import Image from 'next/image'
import notfound from '@/assets/404.jpg'

const page = () => {
  return (
    <div style={{ position: 'absolute', zIndex: 9999999, width: '84%', height: '100%', top: 0, right: '2px' }}>
      <title>404</title>
      <Image src={notfound} alt='404' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

export default page
