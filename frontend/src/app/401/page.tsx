// hooks
import React from 'react'
import Image from 'next/image'
import unauthorized from '@/assets/401.png'
//----------------------------------------------------------------

export default function Custom401() {
  return (
    <div style={{ position: 'absolute', zIndex: 9999999, width: '84%', height: '100%', top: 0, right: '2px' }}>
      <title>401</title>
      <Image src={unauthorized} alt='404' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}
