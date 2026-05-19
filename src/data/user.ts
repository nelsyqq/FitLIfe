import type { User } from '@/types'

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  height: 178,
  weight: 75,
  age: 28,
  goal: 'maintain',
  level: 'intermediate',
  joinedDate: '2024-01-15'
}

export const mockUsers: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Sarah Smith',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    height: 165,
    weight: 58,
    age: 25,
    goal: 'lose',
    level: 'beginner',
    joinedDate: '2024-02-01'
  }
]