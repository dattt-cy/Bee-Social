/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
// @mui
import { styled } from '@mui/material/styles'
import { Container, Typography, Stack, Button, Box, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { GiTreeBeehive, GiBeehive } from 'react-icons/gi'
import { useRouter } from 'next/navigation'
import useResponsive from '@/hooks/useResponsive'

// assets
import Banner from '@/assets/register_option_banner.jpg'
import logoMobile from '@/assets/logoMobile.png'

const BORDER_RADIUS = '16px'

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    width: '70%',
    height: '80%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.shadows[18],
    borderRadius: BORDER_RADIUS,
    background: theme.palette.background.paper
  },
  [theme.breakpoints.down('md')]: {
    height: '100vh'
  }
}))

const StyledBanner = styled('div')(({ theme }) => ({
  width: '42%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: '12px',
  borderTopLeftRadius: BORDER_RADIUS,
  borderBottomLeftRadius: BORDER_RADIUS
}))

const StyledForm = styled(Container)(({ theme }) => ({
  margin: 0,
  minWidth: '58%',
  width: 'auto',
  height: '100%',
  zIndex: 10,
  borderRadius: BORDER_RADIUS,
  display: 'flex',
  justifyContent: 'center'
}))

const StyledContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '65%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(14, 0)
  },
  [theme.breakpoints.down('md')]: {
    width: '95%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(10, 0),
    alignItems: 'center',
    height: '100%'
  }
}))

export default function Register() {
  const [isPersonal, setIsPersonal] = useState(true)
  const router = useRouter()
  const mdUp = useResponsive('up', 'md')

  const _handleNext = () => {
    router.push(isPersonal ? '/register/personal' : '/register/business')
  }

  return (
    <>
      <title>Signup | Beegin</title>
      <StyledRoot>
        <StyledForm>
          <Link href='/login'>
            <IconButton sx={{ position: 'absolute', left: 35, top: 25 }}>
              <ArrowBack />
            </IconButton>
          </Link>

          <StyledContent>
            <Box>
              <Image src={logoMobile} alt='logo' width={38} height={38} />
              <Typography variant='h4' gutterBottom className='mt-6 mb-3 text-2xl'>
                Choose your account type
              </Typography>
              <Typography variant='subtitle2' sx={{ fontSize: '13px' }}>
                Pick an account type based on your need. We offer a wealth experience regardless of the option you
                choose
              </Typography>
            </Box>

            <Box sx={{ my: '35px' }}>
              <Button
                variant={isPersonal ? 'contained' : 'outlined'}
                disabled={isPersonal}
                onClick={() => setIsPersonal(true)}
                sx={{
                  width: '100%',
                  my: 1,
                  borderRadius: '12px',
                  '&:disabled .MuiTypography-h5': { color: (theme) => theme.palette.common.white },
                  '&:disabled .MuiTypography-subtitle2': { color: (theme) => theme.palette.grey[100] }
                }}
              >
                <Stack direction='row' alignItems='center' sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      fontSize: 28,
                      background: (theme) => (isPersonal ? theme.palette.common.white : theme.palette.secondary.main),
                      color: (theme) => (isPersonal ? theme.palette.secondary.main : theme.palette.common.white),
                      p: '10px',
                      m: '10px 5px',
                      borderRadius: '12px'
                    }}
                  >
                    <GiTreeBeehive />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant='h5' sx={{ lineHeight: 1.25, mb: 0.5 }}>
                      Personal
                    </Typography>
                    <Typography variant='subtitle2' sx={{ textTransform: 'initial' }}>
                      Start interacting with your fellow bees
                    </Typography>
                  </Box>
                </Stack>
              </Button>

              <Button
                variant={!isPersonal ? 'contained' : 'outlined'}
                disabled={!isPersonal}
                onClick={() => setIsPersonal(false)}
                sx={{
                  width: '100%',
                  my: 1,
                  borderRadius: '12px',
                  '&:disabled .MuiTypography-h5': { color: (theme) => theme.palette.common.white },
                  '&:disabled .MuiTypography-subtitle2': { color: (theme) => theme.palette.grey[100] }
                }}
              >
                <Stack direction='row' alignItems='center' sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      fontSize: 28,
                      background: (theme) => (!isPersonal ? theme.palette.common.white : theme.palette.secondary.main),
                      color: (theme) => (!isPersonal ? theme.palette.secondary.main : theme.palette.common.white),
                      p: '10px',
                      m: '10px 5px',
                      borderRadius: '12px'
                    }}
                  >
                    <GiBeehive />
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant='h5' sx={{ lineHeight: 1.25, mb: 0.5 }}>
                      Business
                    </Typography>
                    <Typography variant='subtitle2' sx={{ textTransform: 'initial' }}>
                      Further promote your business
                    </Typography>
                  </Box>
                </Stack>
              </Button>
            </Box>

            <Stack direction='row' justifyContent='start' sx={{ width: '100%' }}>
              <Button variant='contained' sx={{ p: '8px 25px' }} onClick={_handleNext}>
                Next Step
              </Button>
            </Stack>
          </StyledContent>
        </StyledForm>

        {mdUp && (
          <StyledBanner>
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image src={Banner} alt='signup' fill style={{ objectFit: 'cover', borderRadius: BORDER_RADIUS }} />
            </Box>
          </StyledBanner>
        )}
      </StyledRoot>
    </>
  )
}
