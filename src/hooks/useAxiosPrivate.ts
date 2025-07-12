// hooks/useAxiosPrivate.ts
import { axiosPrivate } from '@/axios'
import { useEffect, useRef } from 'react'
import useRefreshToken from './useRefreshToken'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { accessToken, setAccessToken, setUser } = useAuth()
  const router = useRouter()
  const interceptorsRef = useRef<{ req?: number; res?: number }>({})

  useEffect(() => {
    // Cleanup interceptors cũ nếu có
    if (interceptorsRef.current.req !== undefined) {
      axiosPrivate.interceptors.request.eject(interceptorsRef.current.req)
    }
    if (interceptorsRef.current.res !== undefined) {
      axiosPrivate.interceptors.response.eject(interceptorsRef.current.res)
    }

    // 1. Sync token từ localStorage vào Context (chỉ khi context chưa có token)
    const stored = localStorage.getItem('accessToken')
    if (stored && !accessToken) {
      setAccessToken(stored)
    }

    // 2. Request interceptor
    const reqInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        // Lấy token mới nhất từ context hoặc localStorage
        const token = accessToken || localStorage.getItem('accessToken')
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // 3. Response interceptor
    const resInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error?.config
        const status = error?.response?.status

        if ((status === 401 || status === 403) && !prevReq?.sent) {
          prevReq.sent = true
          try {
            const newToken = await refresh()
            setAccessToken(newToken)
            localStorage.setItem('accessToken', newToken)

            // Retry với token mới
            if (prevReq.headers) {
              prevReq.headers.Authorization = `Bearer ${newToken}`
            }
            return axiosPrivate(prevReq)
          } catch (refreshError) {
            // Clear auth state khi refresh token fail
            setAccessToken('')
            setUser(null)
            localStorage.removeItem('accessToken')
            router.push('/login')
            return Promise.reject(refreshError)
          }
        }

        // Log lỗi 404 để debug
        if (status === 404) {
          console.error('API endpoint not found:', error.config?.url)
        }

        return Promise.reject(error)
      }
    )

    // Lưu interceptor IDs để cleanup
    interceptorsRef.current = {
      req: reqInterceptor,
      res: resInterceptor
    }

    // Cleanup function
    return () => {
      axiosPrivate.interceptors.request.eject(reqInterceptor)
      axiosPrivate.interceptors.response.eject(resInterceptor)
    }
  }, [accessToken, setAccessToken, setUser, refresh, router])

  return axiosPrivate
}

export default useAxiosPrivate
