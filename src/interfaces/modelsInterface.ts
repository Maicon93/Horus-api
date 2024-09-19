interface CreateUser {
  name: string
  email: string
  password: string
  hashedPassword?: string | null
}

interface User {
  id: number
  name: string
  email: string
  password?: string
  active: boolean
  created_at: string
  sessionHash?: string
}

interface Notices {
  id?: number
  title: string
  text: string
  image_name: string
  id_course: number
  created_at: any
  highlighted: boolean
  preview: string
  created_date?: any
  image_url?: string
}

interface SessionTokens {
  id?: Number
  user_id: Number
  token: string
  validate: any
}
interface Courses {
  id?: Number
  name: string
  id_coordinator: Number
}
interface Persons {
  id?: Number
  name: string
  email: string
}