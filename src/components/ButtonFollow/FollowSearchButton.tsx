import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'

interface FollowSearchButtonProps {
  userId: string
  myId?: string
}

export default function FollowSearchButton({ userId, myId }: FollowSearchButtonProps) {
  // Chỉ dùng state local để toggle UI
  const [follow, setFollow] = useState(false)

  useEffect(() => {
    setFollow(false)
  }, [userId])

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    // Chỉ toggle state, không gọi backend
    setFollow((prev) => !prev)
  }

  // Nếu là chính mình thì không hiển thị nút
  if (userId === myId) return null

  return (
    <Button
      variant={follow ? 'outlined' : 'contained'}
      sx={{
        padding: '10px 20px',
        width: '100px',
        borderRadius: '18px',
        position: 'absolute',
        right: '30px',
        top: '19%',
        backgroundColor: follow ? 'white !important' : 'initial'
      }}
      onClick={handleFollow}
    >
      {follow ? 'Following' : 'Follow'}
    </Button>
  )
}
