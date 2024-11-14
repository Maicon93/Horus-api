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
  create_at: any
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
  description: string
  actuation_area: string
  type: string
  duration: Number
  teachers?: []
  teaching_curriculum?: string
  image_name?: string
  image_url?: string
}
interface Persons {
  id?: Number
  name: string
  email: string
  image_name?: string | null
  image_url?: string
}
