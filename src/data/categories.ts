import type { CategoryInfo } from '@/types'

export const categories: CategoryInfo[] = [
  {
    id: 'full-body',
    title: 'Всё тело',
    description: 'Полная тренировка всего тела',
    icon: 'Dumbbell',
    color: '#22C55E',
    bgColor: 'bg-primary-50'
  },
  {
    id: 'upper-body',
    title: 'Верх тела',
    description: 'Грудь, спина, руки и плечи',
    icon: 'ArmchairIcon',
    color: '#F97316',
    bgColor: 'bg-orange-50'
  },
  {
    id: 'lower-body',
    title: 'Низ тела',
    description: 'Тренировка ног и ягодиц',
    icon: 'Accessibility',
    color: '#8B5CF6',
    bgColor: 'bg-purple-50'
  },
  {
    id: 'core',
    title: 'Корпус',
    description: 'Пресс и сила корпуса',
    icon: 'Repeat',
    color: '#EC4899',
    bgColor: 'bg-pink-50'
  },
  {
    id: 'cardio',
    title: 'Кардио',
    description: 'Разгоняем пульс',
    icon: 'Heart',
    color: '#EF4444',
    bgColor: 'bg-red-50'
  },
  {
    id: 'hiit',
    title: 'ВИИТ',
    description: 'Высокоинтенсивный интервальный тренинг',
    icon: 'Zap',
    color: '#F59E0B',
    bgColor: 'bg-amber-50'
  },
  {
    id: 'yoga',
    title: 'Йога',
    description: 'Гибкость и осознанность',
    icon: 'Flower2',
    color: '#06B6D4',
    bgColor: 'bg-cyan-50'
  },
  {
    id: 'stretching',
    title: 'Растяжка',
    description: 'Улучшение гибкости',
    icon: 'Wind',
    color: '#10B981',
    bgColor: 'bg-emerald-50'
  }
]