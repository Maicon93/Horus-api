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
  id: number
  title: string
  text: string
  link_image: string
  id_course: number
  created_at: any
  highlighted: boolean
  preview: string
  created_date?: any
  image_url?: string
}