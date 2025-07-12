'use client'
import PostCard from '@/components/Posts/PostCard'
import { Box, Typography, Stack, TextField, Avatar, Modal, Pagination } from '@mui/material'
import PostLayout from '@/layouts/PostLayout'
import useResponsive from '@/hooks/useResponsive'
import { Post } from '@/types/post'
import { Feed } from '@/types/feed'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useState, useEffect } from 'react'
import urlConfig from '@/config/urlConfig'
import CreatePost from '@/components/Posts/CreatePost'
import { useAuth } from '@/context/AuthContext'
import { usePathname, useRouter } from 'next/navigation'
import withAuth from '@/authorization/withAuth'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import useTranslation from 'next-translate/useTranslation'

function Home() {
  const { t } = useTranslation('common')
  const isMobile = useResponsive('down', 'sm')
  const { user } = useAuth()
  const axios = useAxiosPrivate()

  // Local state for posts and pagination
  const [open, setOpen] = useState(false)
  const [newPost, setNewPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 5

  // Fetch posts whenever `page` changes
  // ...existing code...
  // Fetch posts whenever `page` changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Gọi function với dấu ngoặc ()
        const response = await axios.get(`${urlConfig.posts.getRandomPost()}?limit=${limit}&page=${page}`)
        const postsData = response.data.data as Post[]
        const totalItems = response.data.total as number

        setPosts(postsData)
        setTotal(totalItems)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }

    fetchPosts()
  }, [axios, page])
  // Handle pagination change
  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <>
      <title>Home | Beegin</title>

      {/* Modal for creating a post */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '80%' : '40%',
            height: isMobile ? '80%' : '83%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            padding: isMobile ? 3 : '20px'
          }}
        >
          <CreatePost open={open} setOpen={setOpen} newPost={newPost} setNewPost={setNewPost} />
        </Box>
      </Modal>

      <PostLayout>
        {/* Create post input */}
        <Stack direction='row' sx={{ mt: 3, ml: 4, justifyContent: 'center' }} spacing={2}>
          <Avatar src={user?.profile?.avatar} sx={{ width: 50, height: 50 }} />
          <TextField
            size='small'
            variant='outlined'
            placeholder={t('CreatePostPlaceholder')}
            onClick={() => setOpen(true)}
            sx={{
              '& .MuiInputBase-root': { height: '50px' },
              width: isMobile ? '90%' : '700px'
            }}
          />
        </Stack>

        {/* Posts list */}
        <Box sx={{ width: '80%', mx: 'auto', mt: 4 }}>
          {posts.map((post) => (post ? <PostCard key={post._feedId || post._id} post={post} /> : null))}
        </Box>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination count={totalPages} page={page} onChange={handleChangePage} color='primary' />
          </Box>
        )}
      </PostLayout>
    </>
  )
}

export default withAuth(Home)(['business', 'user'])
