import React, { useEffect, useState } from 'react'
import { Button, Skeleton } from '@mui/material'

interface ButtonFollowProps {
  userId: string
  status?: boolean
  sendDataToParent: (action: 'follow' | 'unfollow') => void
}

const ButtonFollow: React.FC<ButtonFollowProps> = ({ userId, status, sendDataToParent }) => {
  const [follow, setFollow] = useState<boolean | undefined>(status)

  useEffect(() => {
    if (status !== undefined) {
      setFollow(status)
    } else {
      setFollow(undefined) // sẽ hiển thị skeleton
    }
  }, [userId, status])

  const handleFollow = () => {
    if (follow) {
      sendDataToParent('unfollow')
    } else {
      sendDataToParent('follow')
    }
    setFollow((prev) => !prev)
  }

  return (
    <Button
      variant={follow ? 'outlined' : 'contained'}
      sx={{
        padding: '10px 20px',
        width: '100px',
        borderRadius: '18px',
        backgroundColor: follow ? 'white !important' : 'initial'
      }}
      onClick={handleFollow}
    >
      {follow === undefined ? <Skeleton variant='text' width={80} height={20} /> : follow ? 'Following' : 'Follow'}
    </Button>
  )
}

export default ButtonFollow
