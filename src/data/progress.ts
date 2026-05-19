import type { Progress, Achievement } from '@/types'

export const progressData: Progress[] = [
  { date: '2024-12-01', weight: 76, caloriesBurned: 250, workoutsCompleted: 1, totalDuration: 30, mood: 4, waterIntake: 6 },
  { date: '2024-12-02', weight: 75.8, caloriesBurned: 400, workoutsCompleted: 2, totalDuration: 55, mood: 5, waterIntake: 8 },
  { date: '2024-12-03', weight: 75.5, caloriesBurned: 300, workoutsCompleted: 1, totalDuration: 35, mood: 4, waterIntake: 7 },
  { date: '2024-12-04', weight: 75.6, caloriesBurned: 500, workoutsCompleted: 2, totalDuration: 65, mood: 5, waterIntake: 8 },
  { date: '2024-12-05', weight: 75.3, caloriesBurned: 350, workoutsCompleted: 1, totalDuration: 40, mood: 3, waterIntake: 5 },
  { date: '2024-12-06', weight: 75.1, caloriesBurned: 450, workoutsCompleted: 2, totalDuration: 60, mood: 5, waterIntake: 8 },
  { date: '2024-12-07', weight: 75, caloriesBurned: 600, workoutsCompleted: 3, totalDuration: 85, mood: 5, waterIntake: 9 },
  { date: '2024-12-08', weight: 75.2, caloriesBurned: 200, workoutsCompleted: 1, totalDuration: 25, mood: 4, waterIntake: 6 },
  { date: '2024-12-09', weight: 74.9, caloriesBurned: 400, workoutsCompleted: 2, totalDuration: 55, mood: 5, waterIntake: 7 },
  { date: '2024-12-10', weight: 74.8, caloriesBurned: 350, workoutsCompleted: 1, totalDuration: 35, mood: 4, waterIntake: 8 },
  { date: '2024-12-11', weight: 74.6, caloriesBurned: 500, workoutsCompleted: 2, totalDuration: 70, mood: 5, waterIntake: 8 },
  { date: '2024-12-12', weight: 74.5, caloriesBurned: 300, workoutsCompleted: 1, totalDuration: 30, mood: 4, waterIntake: 6 },
  { date: '2024-12-13', weight: 74.7, caloriesBurned: 450, workoutsCompleted: 2, totalDuration: 60, mood: 5, waterIntake: 7 },
  { date: '2024-12-14', weight: 74.4, caloriesBurned: 550, workoutsCompleted: 2, totalDuration: 75, mood: 5, waterIntake: 9 }
]

export const achievements: Achievement[] = [
  {
    id: 'a1',
    title: 'Первые шаги',
    description: 'Выполните первую тренировку',
    icon: 'Footprints',
    unlockedAt: '2024-12-01',
    progress: 1,
    total: 1
  },
  {
    id: 'a2',
    title: 'Недельный воин',
    description: 'Тренируйтесь 5 дней в неделю',
    icon: 'CalendarCheck',
    unlockedAt: '2024-12-07',
    progress: 5,
    total: 5
  },
  {
    id: 'a3',
    title: 'Сжигатель калорий',
    description: 'Сожгите 5000 калорий всего',
    icon: 'Flame',
    unlockedAt: null,
    progress: 3500,
    total: 5000
  },
  {
    id: 'a4',
    title: 'Строитель силы',
    description: 'Выполните 10 силовых тренировок',
    icon: 'Dumbbell',
    unlockedAt: null,
    progress: 7,
    total: 10
  },
  {
    id: 'a5',
    title: 'Ранняя пташка',
    description: 'Тренировка до 7 утра',
    icon: 'Sunrise',
    unlockedAt: '2024-12-03',
    progress: 1,
    total: 1
  },
  {
    id: 'a6',
    title: 'Преданность',
    description: '30-дневная серия тренировок',
    icon: 'Trophy',
    unlockedAt: null,
    progress: 14,
    total: 30
  },
  {
    id: 'a7',
    title: 'Мастер разнообразия',
    description: 'Попробуйте все категории тренировок',
    icon: 'Sparkles',
    unlockedAt: null,
    progress: 5,
    total: 8
  },
  {
    id: 'a8',
    title: 'Идеальная форма',
    description: 'Оцените 5 тренировок на 5 звёзд',
    icon: 'Star',
    unlockedAt: null,
    progress: 3,
    total: 5
  }
]

export const weeklyData = [
  { day: 'Пн', minutes: 30 },
  { day: 'Вт', minutes: 55 },
  { day: 'Ср', minutes: 35 },
  { day: 'Чт', minutes: 65 },
  { day: 'Пт', minutes: 40 },
  { day: 'Сб', minutes: 60 },
  { day: 'Вс', minutes: 85 }
]

export const monthlyData = [
  { week: 'Неделя 1', workouts: 4, calories: 1500 },
  { week: 'Неделя 2', workouts: 6, calories: 2000 },
  { week: 'Неделя 3', workouts: 5, calories: 1750 },
  { week: 'Неделя 4', workouts: 7, calories: 2250 }
]