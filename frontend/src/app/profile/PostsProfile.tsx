import React, { useEffect, useState } from 'react'
import useResponsive from '@/hooks/useResponsive'
import InfiniteScroll from 'react-infinite-scroll-component'
import Stack from '@mui/material/Stack'
import { Post } from '@/types/post'
import PostCard from '@/components/Posts/PostCard'
import { Modal, Box } from '@mui/material'
import PostSkeleton from '@/components/common/Skeleton/PostSkeleton'
import { usePosts } from '@/context/PostContext'
import { useParams } from 'next/navigation'

interface PostsProfileProps {
  propFetchMoreData: (currentPage?: number) => Promise<any>
}

const PostsProfile: React.FC<PostsProfileProps> = ({ propFetchMoreData }: PostsProfileProps) => {
  const { postsState, postsDispatch } = usePosts()
  const [currentPage, setCurrentPage] = useState(2)

  const fetchMoreData = async (page: number) => {
    const rslt = await propFetchMoreData(page)
    postsDispatch({
      type: 'ADD_POSTS_IN_PROFILE',
      payload: {
        posts: rslt.posts, // sửa lại cho đồng bộ với page.tsx
        totalPosts: rslt.total
      }
    })
    setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      const rslt = await propFetchMoreData(1)
      postsDispatch({
        type: 'SET_PROFILE_POSTS',
        payload: {
          posts: rslt.data, // hoặc rslt.posts nếu API trả về như vậy
          totalPosts: rslt.total
        }
      })
    }
    fetchData()
  }, [])

  return postsState.profile.totalPosts !== undefined ? (
    <InfiniteScroll
      dataLength={postsState.profile.posts?.length || 0}
      next={() => {
        fetchMoreData(currentPage)
      }}
      hasMore={postsState.profile.posts?.length < postsState.profile.totalPosts}
      loader={<PostSkeleton />}
      scrollableTarget='postsProfile'
    >
      {(Array.isArray(postsState.profile.posts) ? postsState.profile.posts : []).map((item, idx) => (
        <PostCard key={item._id ?? idx} post={item} postParent={item?.parent} />
      ))}
    </InfiniteScroll>
  ) : (
    <>
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}

export default PostsProfile
