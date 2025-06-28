/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// @mui
import { styled } from '@mui/material/styles'
import { Container, Typography, Stack, Button, Step, StepLabel, Box, Stepper, IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'

// hooks & components
import useResponsive from '@/hooks/useResponsive'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForms from '../RegisterForms'
import RegistrationComplete from './../RegistrationSuccess'

// assets
import SignupBanner from '@/assets/signup_banner.jpg'
import logoMobile from '@/assets/logoMobile.png'

// types
import { Register } from '@/types/register'

const BORDER_RADIUS = '16px'
const steps = ['Account credentials', 'Profile info', 'Profile picture', 'Preferred topics']

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

const StyledForm = styled(Container)(() => ({
  margin: 0,
  minWidth: '58%',
  height: '100%',
  zIndex: 10,
  borderRadius: BORDER_RADIUS,
  display: 'flex',
  justifyContent: 'center'
}))

const StyledContent = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: '80%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(6, 0)
  },
  [theme.breakpoints.down('md')]: {
    width: '95%',
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: theme.spacing(10, 0),
    alignItems: 'center',
    height: '100%'
  }
}))

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 22 },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
    backgroundImage: 'linear-gradient(95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
  },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
    backgroundImage: 'linear-gradient(95deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1
  }
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #f59df1 0%, #c474ed 50%, #c89df2 100%)'
  })
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props
  // (ở đây bạn có thể gắn icon giống bản cũ nếu muốn)
  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {props.icon}
    </ColorlibStepIconRoot>
  )
}

export default function BusinessRegister() {
  const router = useRouter()
  const mdUp = useResponsive('up', 'md')

  // --- State để truyền vào RegisterForms ---
  const [formValues, setFormValues] = useState<Register>({
    email: '',
    password: '',
    passwordConfirm: '',
    firstname: '',
    lastname: '',
    slug: '',
    address: '',
    bio: '',
    gender: true,
    preferences: []
  })
  const [formErrors, setFormErrors] = useState<Register>({
    email: true,
    password: true,
    passwordConfirm: true,
    firstname: true,
    lastname: true,
    slug: true,
    address: true,
    bio: true,
    gender: true,
    preferences: []
  })
  const [cropper, setCropper] = useState<any>(null)
  const [activeStep, setActiveStep] = useState(0)
  const isLastStep = activeStep === steps.length - 1

  const handleNext = () => setActiveStep((s) => s + 1)
  const handleBack = () => setActiveStep((s) => s - 1)
  const handleFinish = () => router.push('/register-success')

  return (
    <>
      <StyledRoot>
        <StyledForm>
          <Link href='/register'>
            <IconButton sx={{ position: 'absolute', left: 35, top: 25 }}>
              <ArrowBack />
            </IconButton>
          </Link>

          <StyledContent>
            <Box>
              <Image src={logoMobile} alt='logo' width={38} height={38} />
              <Typography variant='h4' gutterBottom sx={{ mt: 6, mb: 6 }}>
                Create a new business account
              </Typography>

              <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Truyền đủ props */}
            <RegisterForms
              step={activeStep}
              formValues={formValues}
              formErrors={formErrors}
              setFormValues={setFormValues}
              setFormErrors={setFormErrors}
              setCropper={setCropper}
            />

            <Stack direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
              {activeStep > 0 ? <Button onClick={handleBack}>Back</Button> : <Box width={75} />}
              <Button
                variant='contained'
                onClick={isLastStep ? handleFinish : handleNext}
                sx={{ background: (theme) => theme.palette.secondary.main, color: '#fff' }}
              >
                {isLastStep ? 'Finish' : 'Next'}
              </Button>
            </Stack>
          </StyledContent>
        </StyledForm>

        {mdUp && (
          <Box
            sx={{
              width: '42%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 1,
              borderTopLeftRadius: BORDER_RADIUS,
              borderBottomLeftRadius: BORDER_RADIUS
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={SignupBanner} alt='signup' fill style={{ objectFit: 'cover', borderRadius: BORDER_RADIUS }} />
            </Box>
          </Box>
        )}
      </StyledRoot>
      {/* Nếu cần màn hoàn thành riêng, bạn có thể thay đổi theo điều kiện */}
    </>
  )
}
