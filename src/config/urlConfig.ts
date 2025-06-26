const UrlConfig = {
  user: {
    login: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/login`,
    refresh: '/api/v1/users/refresh', // dùng cho useAxiosPrivate
    forgotPassword: '/api/v1/users/forgotPassword' // chức năng "Quên mật khẩu"
  }
}

export default UrlConfig
