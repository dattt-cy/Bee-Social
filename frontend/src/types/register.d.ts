export interface Register {
  email: string | boolean
  password: string | boolean
  passwordConfirm: string | boolean
  firstname: string | boolean
  lastname: string | boolean
  gender: boolean | string
  address?: string | boolean
  bio?: string | boolean
  avatar?: string | boolean
  slug?: string | boolean
  preferences?: Array | boolean
}
