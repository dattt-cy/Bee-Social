'use client'
import 'react-quill/dist/quill.snow.css'
import React, { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import { Box, Typography, Stack, Avatar, TextField, IconButton, Button, Modal } from '@mui/material'
import CollectionsIcon from '@mui/icons-material/Collections'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { MdVideoLibrary } from 'react-icons/md'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import urlConfig from '@/config/urlConfig'
import useResponsive from '@/hooks/useResponsive'
import { styled } from '@mui/material/styles'
import useSnackbar from '@/context/snackbarContext'
import Snackbar from '@/components/common/Snackbar'
import { useAuth } from '@/context/AuthContext'
import Autocomplete from '@/components/common/AutoComplete'
import { Post } from '@/types/post'
import PostLoader from '@/components/common/Loader/PostLoader'
import EmojiPicker from '../common/EmojiPicker'
import PostCard from './PostCard'
import { usePosts } from '@/context/PostContext'
import { usePathname } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Video from 'next-video'
import getFileType from '@/utils/getFileType'
import useTranslation from 'next-translate/useTranslation'
import dynamic from 'next/dynamic'

interface NewPostProps {
  content: string | ''
  images: string[] | undefined
  categories: string[] | undefined
}
const quillModules = {
  toolbar: [['bold', 'italic', 'underline', 'strike'], [{ header: [1, 2, 3, false] }], ['link', 'image', 'clean']]
}
const quillFormats = ['header', 'bold', 'italic', 'underline', 'strike', 'link', 'image']

const ImageContainerStyled = styled('div')<{ number: number }>((props) => ({
  display: props.number === 0 ? 'none' : 'grid',
  gridGap: '5px',
  width: '100%',
  height: 'auto',
  padding: '10px',
  gridTemplateColumns: props.number === 1 ? 'minmax(100%,1fr)' : 'repeat(2, 1fr)',
  gridTemplateRows: props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1, 340px)' : 'repeat(2, 170px)',
  '& img': {
    borderRadius: '12px',
    objectFit: 'cover',
    width: '100%',
    height: '100%'
  },
  '& .image-1': {
    gridArea: '1 / 1 / 2 / 2',
    maxHeight: '600px'
  },
  '& .image-2': {
    gridArea: props.number === 3 ? '1 / 2 / 3 / 3' : '1 / 2 / 2 / 3'
  },
  '& .image-3': {
    gridArea: props.number === 4 ? '2 / 1 / 3 / 2' : '2 / 1 / 3 / 2'
  },
  '& .image-4': {
    gridArea: '2 / 2 / 3 / 3'
  },
  '@media only screen and (max-width: 600px)': {
    gridGap: '2px',
    gridTemplateRows:
      props.number === 1 ? 'repeat(1,1fr)' : props.number === 2 ? 'repeat(1,170px)' : 'repeat(2, 120px)',
    '& img': {
      borderRadius: '8px',
      objectFit: 'cover'
    }
  },
  '.next-video-container': {
    height: '100%',
    maxHeight: '400px'
  },
  '.video-2': {
    height: props.number === 3 ? '345px' : '100%'
  }
}))

async function handleFileUpload(files: Array<File | string>) {
  const uploadPromises = files.map((file: File | string) => {
    if (typeof file === 'string') return file
    else {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`)

      return fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${getFileType(file)}/upload`,
        {
          method: 'POST',
          body: formData
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url !== '') {
            const uploadedFileUrl = data.secure_url
            return uploadedFileUrl
          }
        })
        .catch((err) => {
          return err
        })
    }
  })
  const uploadedUrls = await Promise.all(uploadPromises)
  return uploadedUrls
}

interface CreatePostProps {
  open: boolean
  setOpen: (open: boolean) => void
  post: Post | null
  repost?: Post
}
function decodeHtmlEntities(html: string) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return doc.documentElement.textContent || ''
}

const EditPost = ({ open, setOpen, post, repost }: CreatePostProps) => {
  const { t } = useTranslation('common')
  const isMobile = useResponsive('down', 'sm')
  const { user } = useAuth()
  const [content, setContent] = useState<string>('')
  const [images, setImages] = useState<any>(post?.images)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const axiosPrivate = useAxiosPrivate()
  const { setSnack } = useSnackbar()
  const { postsState, postsDispatch } = usePosts()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (post?.content) {
      setContent(decodeHtmlEntities(post.content))
    }
  }, [post])

  const handleImageChange = (e: any) => {
    const { files } = e.target
    if (files && files.length > 0 && images.length <= 4) {
      const newImages = [...images]
      var pushLength = files.length
      if (pushLength + images.length > 4) pushLength = 4 - images.length
      for (let i = 0; i < pushLength; i++) {
        newImages.push(files[i])
      }
      setImages(newImages)
    }
  }
  const handleDeleteImages = (indexToRemove: number) => {
    setImages((prevItems: any) => prevItems.filter((item: any, index: number) => index !== indexToRemove))
  }

  const updatePostApi = async (data: NewPostProps) => {
    const response = await axiosPrivate.patch(urlConfig.posts.update(post?._id), {
      content: data.content,
      images: data.images,
      categories: data.categories,
      parent: repost?._id
    })

    if (response.data.status === 'success') {
      setIsLoad(false)
      setOpen(false)
      queryClient.setQueryData(['categoryPosts'], (oldData: any) => {
        if (!oldData) return
        const updatedPosts = [...oldData]
        const index = updatedPosts.findIndex((item: any) => item._id === post?._id)
        updatedPosts[index] = data
        return updatedPosts
      })
      postsDispatch({ type: 'UPDATE_POST', payload: response.data.data })
      setSnack({ open: true, message: 'Update post successfully!', type: 'success' })
    } else {
      setIsLoad(false)
      setOpen(false)
      setSnack({ open: true, message: 'Update post failed!', type: 'error' })
    }
  }

  const createPost = async () => {
    if (!content && images.length === 0 && !repost) {
      setSnack({
        open: true,
        message: 'Write something or add images to your post!',
        type: 'error'
      })
      return
    }
    setIsLoad(true)
    const uploadedUrls = await handleFileUpload(images)
    const data = {
      content: content,
      images: uploadedUrls
    }
    //@ts-ignore
    updatePostApi(data)
  }

  return (
    <>
      <Snackbar />
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            //   width: isMobile ? '80vw' : width ? width : '100vw',
            width: isMobile ? '80%' : '40%',
            height: isMobile ? '80%' : '83%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            padding: isMobile ? 3 : '20px'
          }}
        >
          {isLoad && <PostLoader />}
          <Stack direction={'row'} sx={{ alignItems: 'center' }} gap={2}>
            <Avatar alt='Remy Sharp' src={user?.profile?.avatar} sx={{ width: 60, height: 60 }} />
            <Box>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                {' '}
                {user?.profile?.firstname + ' ' + user?.profile?.lastname}
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: isMobile ? '10px' : '14px',
                  fontWeight: 400
                }}
              >
                @{user?.profile?.slug}
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              justifyContent: 'space-between',
              maxHeight: '530px',
              height: '60%',
              overflow: 'auto',
              marginTop: '17px'
            }}
          >
            <Box
              sx={{
                width: '100%',
                marginTop: '20px',
                marginBottom: '10px',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-root': {
                  overflow: 'auto'
                }
              }}
            >
              <ReactQuill
                theme='snow'
                value={content} // ← dùng value để bind state
                onChange={setContent} // ← khi content thay đổi, Quill sẽ tự render lại
                placeholder={t("What's on your mind?")}
                modules={quillModules}
                formats={quillFormats}
                style={{ height: '100%' }} // để Quill tận dụng toàn bộ height của Box
              />
              <Box sx={{ position: 'relative', paddingBottom: '30px' }}>
                <ImageContainerStyled number={images ? images.length : 0}>
                  {images?.map((item: any, index: number) =>
                    getFileType(item) === 'video' ? (
                      <span className={`image-${index + 1}`} style={{ position: 'relative' }}>
                        <Video
                          className={`video-${index + 1}`}
                          src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                          autoPlay={false}
                          accentColor='#E078D8'
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: '6%',
                            right: '5%',
                            backgroundColor: (theme) => `${theme.palette.common.white}aa !important`,
                            zIndex: 3,
                            '&:hover': { backgroundColor: (theme) => `${theme.palette.common.white}!important` }
                          }}
                          onClick={() => handleDeleteImages(index)}
                        >
                          <CloseRoundedIcon sx={{ color: 'black', fontSize: '21px' }} />
                        </IconButton>
                      </span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <span className={`image-${index + 1}`} style={{ position: 'relative' }}>
                        <img
                          src={typeof item === 'string' ? item : URL.createObjectURL(item)}
                          key={index}
                          alt='image'
                          loading='lazy'
                        />
                        <IconButton
                          sx={{
                            position: 'absolute',
                            top: '6%',
                            right: '5%',
                            backgroundColor: (theme) => `${theme.palette.common.white}aa !important`,
                            zIndex: 3,
                            '&:hover': { backgroundColor: (theme) => `${theme.palette.common.white}!important` }
                          }}
                          onClick={() => handleDeleteImages(index)}
                        >
                          <CloseRoundedIcon sx={{ color: 'black', fontSize: '21px' }} />
                        </IconButton>
                      </span>
                    )
                  )}
                </ImageContainerStyled>
                {repost && <PostCard post={repost} isRepost={true} />}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'fixed',
              bottom: '0px', // Adjust the position as needed
              zIndex: 999, // Adjust the z-index as needed
              backgroundColor: 'white',
              height: '190px',
              width: '95%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '10px',
                padding: '13px 10px'
              }}
            >
              <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '20px', width: '45%', marginLeft: '15px' }}>
                Add to your post
              </Typography>
              <Stack direction={'row'} gap={2} sx={{ width: '55%', justifyContent: 'end' }}>
                {/* <>
                <input
                  accept='*'
                  type='file'
                  id='icon-button-video'
                  multiple
                  onChange={handleImageChange}
                  className='hidden'
                />
                <label htmlFor='icon-button-video'>
                  <IconButton
                    component='span'
                    sx={{ color: (theme: any) => theme.palette.secondary.main, fontSize: '35px' }}
                  >
                    <MdVideoLibrary />
                  </IconButton>
                </label>
              </>  */}
                <>
                  <input
                    accept='image/*, video/*'
                    type='file'
                    id='icon-button-file'
                    multiple
                    onChange={handleImageChange}
                    className='hidden'
                    disabled={images.length === 4}
                  />
                  <label htmlFor='icon-button-file'>
                    <IconButton component='span' disabled={images.length === 4}>
                      <CollectionsIcon
                        //@ts-ignore
                        sx={{
                          color:
                            images.length === 4
                              ? //@ts-ignore
                                (theme) => theme.palette.disabled
                              : (theme) => theme.palette.secondary.main
                        }}
                        fontSize='large'
                      />
                    </IconButton>
                  </label>
                </>
                <EmojiPicker content={content} setContent={setContent} sizeMedium={false} />
              </Stack>
            </Box>
            <Button
              variant='contained'
              sx={{
                width: '100%',
                marginTop: '20px',
                padding: '12px 0',
                color: 'white !important'
              }}
              onClick={() => createPost()}
              disabled={!content && images.length === 0 && !repost ? true : false}
            >
              Edit Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default EditPost
