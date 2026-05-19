export default {
  app: {
    name: 'FitLife'
  },
  nav: {
    dashboard: 'Главная',
    workouts: 'Тренировки',
    progress: 'Прогресс',
    profile: 'Профиль',
    settings: 'Настройки',
    back: 'Назад',
    seeAll: 'Все',
    save: 'Сохранить',
    start: 'Начать'
  },
  welcome: {
    title: 'FitLife',
    subtitle: 'Ваш фитнес-путь начинается здесь',
    description: 'Трансформируйте своё тело, разум и жизнь с персонализированными тренировками',
    getStarted: 'Начать бесплатно',
    haveAccount: 'У меня уже есть аккаунт',
    features: {
      smart: { title: 'Умные тренировки', desc: 'Планы на ИИ' },
      track: { title: 'Отслеживание', desc: 'Визуальная аналитика' },
      goals: { title: 'Ставьте цели', desc: 'Оставайтесь в тонусе' },
      fast: { title: 'Быстрые результаты', desc: 'ВИИТ и сила' }
    }
  },
  auth: {
    login: {
      title: 'С возвращением',
      subtitle: 'Войдите, чтобы продолжить свой фитнес-путь',
      email: 'Эл. почта',
      emailPlaceholder: 'your@email.com',
      password: 'Пароль',
      passwordPlaceholder: 'Введите пароль',
      remember: 'Запомнить меня',
      forgot: 'Забыли пароль?',
      signIn: 'Войти',
      noAccount: 'Нет аккаунта?',
      signUp: 'Зарегистрироваться',
      errors: {
        emailRequired: 'Эл. почта обязательна',
        emailInvalid: 'Неверный формат эл. почты',
        passwordRequired: 'Пароль обязателен',
        passwordMin: 'Пароль должен содержать минимум 6 символов',
        invalid: 'Неверный email или пароль'
      }
    },
    register: {
      title: 'Создать аккаунт',
      subtitle: 'Начните свою фитнес-трансформацию сегодня',
      name: 'Полное имя',
      namePlaceholder: 'Ваше имя',
      email: 'Эл. почта',
      emailPlaceholder: 'your@email.com',
      password: 'Пароль',
      passwordPlaceholder: 'Создайте пароль',
      confirmPassword: 'Подтвердите пароль',
      confirmPlaceholder: 'Подтвердите пароль',
      agree: 'Я согласен с',
      terms: 'Условиями обслуживания',
      and: 'и',
      privacy: 'Политикой конфиденциальности',
      create: 'Создать аккаунт',
      haveAccount: 'Уже есть аккаунт?',
      signIn: 'Войти',
      errors: {
        nameRequired: 'Имя обязательно',
        emailRequired: 'Эл. почта обязательна',
        emailInvalid: 'Неверный формат эл. почты',
        passwordRequired: 'Пароль обязателен',
        passwordMin: 'Пароль должен содержать минимум 6 символов',
        passwordsNotMatch: 'Пароли не совпадают'
      }
    }
  },
  dashboard: {
    greeting: {
      morning: 'Доброе утро! Готовы покорять?',
      afternoon: 'Добрый день! Продолжаем двигаться!',
      evening: 'Добрый вечер! Отличное время для тренировки!',
      hi: 'Привет'
    },
    stats: {
      workouts: 'Тренировки',
      calories: 'Калории',
      minutes: 'Минуты',
      burned: 'Сожжено калорий',
      totalMinutes: 'Всего минут',
      streak: 'дней'
    },
    streak: {
      title: 'Текущая серия',
      subtitle: 'Продолжайте! У вас отлично получается!'
    },
    week: {
      title: 'На этой неделе',
      total: 'мин всего'
    },
    recommended: 'Рекомендуем',
    achievements: 'Достижения',
    quickActions: {
      start: 'Начать тренировку',
      progress: 'Мой прогресс',
      settings: 'Настройки'
    },
    weight: {
      title: 'Прогресс веса',
      current: 'Текущий вес',
      height: 'Рост',
      age: 'Возраст',
      cm: 'см',
      kg: 'кг',
      years: 'лет'
    }
  },
  workouts: {
    title: 'Тренировки',
    subtitle: 'Выберите тренировку и начните заниматься',
    all: 'Все',
    empty: 'Ничего не найдено',
    emptyHint: 'Попробуйте выбрать другую категорию',
    start: 'Начать тренировку',
    exercises: 'Упражнения',
    similar: 'Похожие тренировки',
    details: {
      minutes: 'мин',
      calories: 'ккал',
      exercises: 'упр.',
      sets: 'подходов',
      reps: 'повтор.',
      kg: 'кг',
      seconds: 'с'
    },
    difficulty: {
      beginner: 'Для начинающих',
      intermediate: 'Средний уровень',
      advanced: 'Продвинутый'
    }
  },
  progress: {
    title: 'Ваш прогресс',
    subtitle: 'Отслеживайте свой фитнес-путь',
    caloriesBurned: 'Сожжено калорий',
    workoutsDone: 'Тренировок выполнено',
    weightChange: 'Изменение веса',
    avgMood: 'Среднее настроение',
    weeklyActivity: 'Недельная активность',
    monthlyBreakdown: 'Статистика по месяцам',
    workouts: 'тренир.',
    achievements: 'Достижения',
    week: 'Неделя'
  },
  profile: {
    stats: {
      height: 'Рост',
      weight: 'Вес',
      age: 'Возраст',
      cm: 'см',
      kg: 'кг'
    },
    menu: {
      settings: 'Настройки',
      notifications: 'Уведомления',
      achievements: 'Достижения',
      history: 'История тренировок',
      activity: 'Журнал активности',
      privacy: 'Конфиденциальность'
    },
    logout: 'Выйти',
    level: {
      beginner: 'Новичок',
      intermediate: 'Средний',
      advanced: 'Продвинутый'
    },
    goal: {
      lose: 'Похудение',
      maintain: 'Поддержание',
      gain: 'Набор массы'
    }
  },
  settings: {
    title: 'Настройки',
    profile: 'Профиль',
    name: 'Полное имя',
    namePlaceholder: 'Ваше имя',
    email: 'Эл. почта',
    emailPlaceholder: 'your@email.com',
    height: 'Рост (см)',
    weight: 'Вес (кг)',
    age: 'Возраст',
    goals: 'Фитнес-цели',
    goal: 'Цель',
    level: 'Уровень',
    preferences: 'Настройки',
    notifications: 'Уведомления',
    notificationsHint: 'Напоминания и советы по тренировкам',
    sound: 'Звуковые эффекты',
    soundHint: 'Воспроизводить звуки во время тренировки',
    language: 'Язык',
    save: 'Сохранить изменения',
    goalOptions: {
      lose: 'Похудение',
      maintain: 'Поддержание',
      gain: 'Набор массы'
    },
    levelOptions: {
      beginner: 'Новичок',
      intermediate: 'Средний',
      advanced: 'Продвинутый'
    },
    languageOptions: {
      ru: 'Русский',
      en: 'English'
    },
    darkMode: 'Тёмная тема',
    darkModeHint: 'Скоро будет доступно'
  },
  workoutDetail: {
    difficulty: {
      beginner: 'Для начинающих',
      intermediate: 'Средний уровень',
      advanced: 'Продвинутый'
    },
    start: 'Начать тренировку',
    similar: 'Похожие тренировки'
  }
}