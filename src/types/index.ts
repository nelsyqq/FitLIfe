export interface User {
  id: string
  name: string
  email: string
  avatar: string
  height: number
  weight: number
  age: number
  goal: 'lose' | 'maintain' | 'gain'
  level: 'beginner' | 'intermediate' | 'advanced'
  joinedDate: string
}

export interface Workout {
  id: string
  title: string
  description: string
  category: WorkoutCategory
  duration: number
  calories: number
  exercises: Exercise[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  image: string
  completedDates: string[]
  createdAt: string
}

export interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  image: string
  videoUrl?: string
}

export type WorkoutCategory = 
  | 'full-body'
  | 'upper-body'
  | 'lower-body'
  | 'core'
  | 'cardio'
  | 'stretching'
  | 'hiit'
  | 'yoga'

export interface WorkoutSession {
  id: string
  workoutId: string
  userId: string
  date: string
  duration: number
  caloriesBurned: number
  exercises: ExerciseSession[]
  completed: boolean
  rating?: number
  notes?: string
}

export interface ExerciseSession {
  exerciseId: string
  setsCompleted: number
  repsCompleted: number[]
  weightUsed?: number
}

export interface Progress {
  date: string
  weight?: number
  bodyFat?: number
  caloriesBurned: number
  workoutsCompleted: number
  totalDuration: number
  mood?: number
  waterIntake?: number
  sleepHours?: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt: string | null
  progress: number
  total: number
}

export interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image: string
  time: string
}

export interface NutritionDay {
  date: string
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
  meals: Meal[]
}

export interface CategoryInfo {
  id: WorkoutCategory
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
}

export interface BottomNavItem {
  id: string
  label: string
  icon: string
  path: string
}