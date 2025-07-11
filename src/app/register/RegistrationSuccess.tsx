import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Verified from '@/assets/Verify.png'
import useResponsive from '@/hooks/useResponsive'

const RegistrationComplete = () => {
  const isMobile = useResponsive('down', 'sm')
  const [fadeIn, setFadeIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Trigger the fade-in effect after a short delay
    const fadeTimer = setTimeout(() => setFadeIn(true), 100)

    // Redirect to login after showing the message
    const redirectTimer = setTimeout(() => {
      router.push('/login')
    }, 2000) // 2 seconds delay before redirect

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 1s ease-in-out'
  }

  return (
    <div style={containerStyle}>
      <Image src={Verified} alt='success_img' width={200} height={200} />
      <Typography
        variant='h1'
        style={{
          fontSize: isMobile ? '17px' : '30px',
          marginTop: '15px',
          textAlign: 'center',
          padding: '0 10px'
        }}
      >
        Registration successful!
      </Typography>
    </div>
  )
}

export default RegistrationComplete
