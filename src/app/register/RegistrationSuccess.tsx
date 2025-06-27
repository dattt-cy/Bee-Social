'use client'

import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Verified from '@/assets/Verify.png'

const RegistrationComplete = () => {
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1s ease-in-out'
  } as React.CSSProperties

  return (
    <div style={containerStyle}>
      <Image src={Verified} alt='success_img' width={700} height={200} />
      <Typography variant='h5' sx={{ mt: 2, px: 2, textAlign: 'center' }}>
        Account Created Successfully! Please verify your email.
      </Typography>
    </div>
  )
}

export default RegistrationComplete
