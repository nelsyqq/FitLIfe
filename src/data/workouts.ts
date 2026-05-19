import type { Workout } from '@/types'

export const workouts: Workout[] = [
  {
    id: 'w1',
    title: 'Утренняя зарядка',
    description: 'Начните день с этой энергичной тренировки для всего тела',
    category: 'full-body',
    duration: 20,
    calories: 180,
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e1', name: 'Джампинг Джек', sets: 3, reps: 20, image: '' },
      { id: 'e2', name: 'Отжимания', sets: 3, reps: 10, image: '' },
      { id: 'e3', name: 'Приседания', sets: 3, reps: 15, image: '' },
      { id: 'e4', name: 'Планка', sets: 3, reps: 30, duration: 30, image: '' },
      { id: 'e5', name: 'Скалолаз', sets: 3, reps: 20, image: '' }
    ]
  },
  {
    id: 'w2',
    title: 'Сила верхней части',
    description: 'Развивайте силу груди, спины и рук',
    category: 'upper-body',
    duration: 35,
    calories: 250,
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e6', name: 'Отжимания', sets: 4, reps: 12, image: '' },
      { id: 'e7', name: 'Тяга гантелей', sets: 3, reps: 12, weight: 10, image: '' },
      { id: 'e8', name: 'Жим гантелей', sets: 3, reps: 10, weight: 8, image: '' },
      { id: 'e9', name: 'Сгибание рук', sets: 3, reps: 12, weight: 6, image: '' },
      { id: 'e10', name: 'Отжимания на трицепс', sets: 3, reps: 10, image: '' }
    ]
  },
  {
    id: 'w3',
    title: 'День ног',
    description: 'Укрепите нижнюю часть тела этими упражнениями',
    category: 'lower-body',
    duration: 40,
    calories: 320,
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e11', name: 'Приседания с весом', sets: 4, reps: 15, weight: 12, image: '' },
      { id: 'e12', name: 'Выпады', sets: 3, reps: 12, image: '' },
      { id: 'e13', name: 'Румынская тяга', sets: 3, reps: 10, weight: 20, image: '' },
      { id: 'e14', name: 'Подъём на носки', sets: 4, reps: 20, image: '' },
      { id: 'e15', name: 'Ягодичный мостик', sets: 3, reps: 15, image: '' }
    ]
  },
  {
    id: 'w4',
    title: 'Корпус',
    description: 'Скульптурируйте пресс и укрепляйте корпус',
    category: 'core',
    duration: 25,
    calories: 200,
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e16', name: 'Скручивания', sets: 3, reps: 20, image: '' },
      { id: 'e17', name: 'Русский твист', sets: 3, reps: 16, image: '' },
      { id: 'e18', name: 'Подъём ног', sets: 3, reps: 12, image: '' },
      { id: 'e19', name: 'Велосипед', sets: 3, reps: 20, image: '' },
      { id: 'e20', name: 'Планка удержание', sets: 3, reps: 45, duration: 45, image: '' }
    ]
  },
  {
    id: 'w5',
    title: 'Кардио взрыв',
    description: 'Энергичное кардио для быстрого сжигания калорий',
    category: 'cardio',
    duration: 30,
    calories: 350,
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e21', name: 'Скакалка', sets: 3, reps: 60, duration: 60, image: '' },
      { id: 'e22', name: 'Высокое колено', sets: 3, reps: 30, image: '' },
      { id: 'e23', name: 'Бёрпи', sets: 3, reps: 10, image: '' },
      { id: 'e24', name: 'Скалолаз', sets: 3, reps: 30, image: '' },
      { id: 'e25', name: 'Прыжки на тумбу', sets: 3, reps: 12, image: '' }
    ]
  },
  {
    id: 'w6',
    title: 'ВИИТ Инферно',
    description: 'Интенсивный интервальный тренинг для максимальных результатов',
    category: 'hiit',
    duration: 25,
    calories: 400,
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e26', name: 'Бёрпи', sets: 4, reps: 15, image: '' },
      { id: 'e27', name: 'Спринт на месте', sets: 4, reps: 30, duration: 30, image: '' },
      { id: 'e28', name: 'Прыжковые приседания', sets: 4, reps: 12, image: '' },
      { id: 'e29', name: 'Отжимания с хлопком', sets: 4, reps: 10, image: '' },
      { id: 'e30', name: 'Планка с прыжками', sets: 4, reps: 16, image: '' }
    ]
  },
  {
    id: 'w7',
    title: 'Утренняя йога',
    description: 'Мягкий поток йоги для начала дня',
    category: 'yoga',
    duration: 30,
    calories: 150,
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e31', name: 'Собака мордой вниз', sets: 2, reps: 60, duration: 60, image: '' },
      { id: 'e32', name: 'Воин I', sets: 2, reps: 45, duration: 45, image: '' },
      { id: 'e33', name: 'Поза дерева', sets: 2, reps: 30, duration: 30, image: '' },
      { id: 'e34', name: 'Кошка-корова', sets: 2, reps: 10, image: '' },
      { id: 'e35', name: 'Поза ребёнка', sets: 2, reps: 60, duration: 60, image: '' }
    ]
  },
  {
    id: 'w8',
    title: 'Растяжка всего тела',
    description: 'Комплексная растяжка для всего тела',
    category: 'stretching',
    duration: 20,
    calories: 100,
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=300&fit=crop',
    completedDates: [],
    createdAt: '2024-01-01',
    exercises: [
      { id: 'e36', name: 'Повороты шеи', sets: 2, reps: 10, image: '' },
      { id: 'e37', name: 'Растяжка плеч', sets: 2, reps: 30, duration: 30, image: '' },
      { id: 'e38', name: 'Растяжка подколенных', sets: 2, reps: 30, duration: 30, image: '' },
      { id: 'e39', name: 'Растяжка квадрицепсов', sets: 2, reps: 30, duration: 30, image: '' },
      { id: 'e40', name: 'Скручивание позвоночника', sets: 2, reps: 30, duration: 30, image: '' }
    ]
  }
]