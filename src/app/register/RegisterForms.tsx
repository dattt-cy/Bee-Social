'use client'

import {
  FormGroup,
  Stack,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
  Typography
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useState, ChangeEvent, useEffect } from 'react'
import { Register } from '@/types/register'
import ImageCropper from '@/components/common/ImageCropper'

interface RegisterFormsProps {
  step: number
  formValues: Register
  formErrors: Register
  setFormValues: (formValues: Register) => void
  setCropper: any
  setFormErrors: (formErrors: Register) => void
}

const RegisterForms = ({
  step,
  formValues,
  setFormValues,
  setCropper,
  formErrors,
  setFormErrors
}: RegisterFormsProps) => {
  const [editMode, setEditMode] = useState(false)
  const [newAvatar, setNewAvatar] = useState('')

  const getNewAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEditMode(true)
      setNewAvatar(URL.createObjectURL(e.target.files[0]))
    }
  }

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormValues({
      ...formValues,
      [name]: value
    })
    setFormErrors({
      ...formErrors,
      [name]: value.length > 0
    })
  }

  // ✅ MOCK categories
  const [topics, setTopics] = useState([
    { _id: '1', name: 'Technology', isChecked: false },
    { _id: '2', name: 'Health', isChecked: false },
    { _id: '3', name: 'Music', isChecked: false },
    { _id: '4', name: 'Art', isChecked: false },
    { _id: '5', name: 'Gaming', isChecked: false }
  ])

  const handleCheckboxTick = (topic: any, index: number) => {
    const changedTopics = [...topics]
    changedTopics[index].isChecked = !changedTopics[index].isChecked
    setTopics(changedTopics)

    const updatedPreferences = changedTopics.filter((t) => t.isChecked).map((t) => t._id)

    setFormValues({ ...formValues, preferences: updatedPreferences })
  }

  return (
    <form className='w-full'>
      {/* Step 0 */}
      <FormGroup sx={{ display: step === 0 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <TextField
            error={!formErrors.email}
            name='email'
            label='Email'
            value={formValues.email}
            helperText={!formErrors.email && 'Please fill in your email'}
            onChange={handleTextFieldChange}
          />
          <TextField
            error={!formErrors.password}
            name='password'
            type='password'
            label='Password'
            value={formValues.password}
            helperText={!formErrors.password && 'Please fill in your password'}
            onChange={handleTextFieldChange}
          />
          <TextField
            error={!formErrors.passwordConfirm}
            name='passwordConfirm'
            type='password'
            label='Confirm Password'
            value={formValues.passwordConfirm}
            helperText={!formErrors.passwordConfirm && 'Please confirm your password'}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>

      {/* Step 1 */}
      <FormGroup sx={{ display: step === 1 ? '' : 'none' }}>
        <Stack spacing={3} className='w-full px-5'>
          <Stack direction='row' spacing={3}>
            <TextField
              error={!formErrors.firstname}
              name='firstname'
              label='First Name'
              value={formValues.firstname}
              helperText={!formErrors.firstname && 'Please fill in your first name'}
              onChange={handleTextFieldChange}
            />
            <TextField
              error={!formErrors.lastname}
              name='lastname'
              label='Last Name'
              value={formValues.lastname}
              helperText={!formErrors.lastname && 'Please fill in your last name'}
              onChange={handleTextFieldChange}
            />
          </Stack>
          <TextField
            error={!formErrors.slug}
            name='slug'
            label='Username'
            value={formValues.slug}
            helperText={!formErrors.slug && 'Please fill in your username'}
            onChange={handleTextFieldChange}
          />
          <Stack direction='row' spacing={3}>
            <TextField
              error={!formErrors.address}
              name='address'
              label='Address'
              value={formValues.address}
              helperText={!formErrors.address && 'Please fill in your address'}
              onChange={handleTextFieldChange}
              sx={{ width: '200%' }}
            />
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={formValues.gender ? 1 : 0}
                label='Gender'
                onChange={(e) => setFormValues({ ...formValues, gender: e.target.value === 1 })}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={0}>Female</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            error={!formErrors.bio}
            name='bio'
            label='Bio'
            value={formValues.bio}
            helperText={!formErrors.bio && 'Please fill in your bio'}
            onChange={handleTextFieldChange}
          />
        </Stack>
      </FormGroup>

      {/* Step 2: Avatar */}
      <FormGroup sx={{ display: step === 2 ? '' : 'none' }}>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          {editMode ? (
            <ImageCropper cancelEdit={() => setEditMode(false)} avatarUrl={newAvatar} setCropper={setCropper} />
          ) : (
            <div className='flex items-center justify-center w-full'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-[300px] h-[300px] border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-white'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <svg className='w-8 h-8 mb-4 text-violet-800' viewBox='0 0 20 16' fill='none'>
                    <path
                      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.2 5.02A4 4 0 0 0 5 13h2.167M10 15V6m0 0L8 8m2-2 2 2'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <p className='mb-2 text-sm text-violet-800'>
                    <span className='font-semibold'>Click to upload</span> or just skip for now
                  </p>
                  <p className='text-xs text-violet-800'>SVG, PNG, JPG or GIF</p>
                </div>
                <input id='dropzone-file' type='file' accept='image/*' onChange={getNewAvatar} className='hidden' />
              </label>
            </div>
          )}
          {editMode && (
            <Stack direction='column' sx={{ ml: 2 }} spacing={1}>
              <IconButton
                onClick={() => {
                  setEditMode(false)
                  setCropper(null)
                }}
              >
                <Delete />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </FormGroup>

      {/* Step 3: Categories */}
      <FormGroup sx={{ display: step === 3 ? '' : 'none' }}>
        <Box className='w-full px-5 text-center'>
          <Typography variant='h4' sx={{ fontSize: '14px', color: (theme) => theme.palette.secondary.main, mb: 2 }}>
            Choose at least 3 categories you'd prefer to see
          </Typography>
          {topics.map((topic, index) => (
            <Button
              key={index}
              sx={{ m: '8px' }}
              variant={topic.isChecked ? 'contained' : 'outlined'}
              onClick={() => handleCheckboxTick(topic, index)}
            >
              {topic.name}
            </Button>
          ))}
        </Box>
      </FormGroup>
    </form>
  )
}

export default RegisterForms
