/* eslint-disable react-hooks/exhaustive-deps */
// @mui
'use client'

import {
  Typography,
  Avatar,
  Box,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Stack,
  Paper,
  Menu
} from '@mui/material'
import { Logout, AccountCircle } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded'

// hooks
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// components
import Link from 'next/link'

// configs
import { useAuth } from '@/context/AuthContext'

//----------------------------------------------------------------

const StyledIconBox = styled('div')(({ theme }) => ({
  width: '55px',
  height: '55px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  ':hover': { scale: '105%' },
  '& svg': {
    fontSize: '24px',
    color: 'white'
  },
  boxShadow: '-7px 10px 21px 1px rgba(204.44, 128.17, 240.32, 0.30)'
}))

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  width: '100%',
  borderRadius: '6px',
  margin: '2px 0',
  padding: '10px 15px',
  minWidth: '220px'
}))

//----------------------------------------------------------------

const ProfilePopover = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const signOutFn = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <div>
      <Button
        sx={{
          borderRadius: '50%',
          transition: 'all 0.15s ease-in-out'
        }}
        onClick={handleClick}
      >
        <StyledIconBox>
          <Person2RoundedIcon />
        </StyledIconBox>
      </Button>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          '& .MuiList-root': {
            overflow: 'hidden'
          },
          '& .MuiMenu-paper': {
            '@media (-webkit-device-pixel-ratio: 1.25)': {
              left: '1500px !important'
            }
          }
        }}
      >
        <Paper>
          <StyledMenuItem sx={{ pointerEvents: 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}>
              <Avatar src={user?.profile.avatar} alt='photoURL' />
              <Box sx={{ ml: 1.5 }}>
                <Typography variant='h5' sx={{ color: 'text.primary', lineHeight: '1', marginRight: '10px' }}>
                  {user?.profile.firstname + ' ' + user?.profile.lastname}
                </Typography>
                <Typography variant='subtitle2' sx={{ color: 'text.secondary' }}>
                  @{user?.profile.slug}
                </Typography>
              </Box>
            </Box>
          </StyledMenuItem>

          <Divider sx={{ m: '0 !important' }} />

          <Stack sx={{ p: '8px' }}>
            <Link href='/profile'>
              <StyledMenuItem onClick={handleClose}>
                <ListItemIcon sx={{ color: '#1976d2' }}>
                  <AccountCircle fontSize='small' />
                </ListItemIcon>
                <ListItemText sx={{ '& span': { color: '#1976d2 !important', textDecoration: 'none' } }}>Manage Profile</ListItemText>
              </StyledMenuItem>
            </Link>
          </Stack>

          <Divider sx={{ m: '0px 0' }} />

          <Stack sx={{ p: '8px' }}>
            <StyledMenuItem onClick={signOutFn}>
              <ListItemIcon sx={{ color: '#FF4842' }}>
                <Logout fontSize='small' />
              </ListItemIcon>
              <ListItemText sx={{ '& span': { color: '#FF4842 !important' } }}>Sign Out</ListItemText>
            </StyledMenuItem>
          </Stack>
        </Paper>
      </Menu>
    </div>
  )
}

export default ProfilePopover
