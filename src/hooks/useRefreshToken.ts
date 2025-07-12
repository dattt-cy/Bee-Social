// hooks/useRefreshToken.ts
import { axiosPrivate } from '@/axios' // dùng chung axiosPrivate có withCredentials
import { useAuth } from '@/context/AuthContext'
import UrlConfig from '@/config/urlConfig'
import { useRouter } from 'next/navigation'

const useRefreshToken = () => {
  const { setAccessToken, setUser } = useAuth()
  const router = useRouter()

  const refresh = async (): Promise<string> => {
    try {
      const response = await axiosPrivate.get(UrlConfig.user.refresh, {
        withCredentials: true
      })
      const { token, data } = response.data
      // 1. Cập nhật Context & localStorage
      setAccessToken(token)
      setUser(data.user)
      localStorage.setItem('accessToken', token)
      return token
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 401 || status === 403) {
        // 2. Clear toàn bộ state cũ
        setAccessToken('')
        setUser(null)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('persist')
        // 3. Redirect về login
        router.push('/login')
      }
      // 4. Ném lỗi để interceptor không retry vô ích
      throw err
    }
  }

  return refresh
}

export default useRefreshToken
