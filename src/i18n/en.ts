export default {
  app: {
    name: 'FitLife'
  },
  nav: {
    dashboard: 'Dashboard',
    workouts: 'Workouts',
    progress: 'Progress',
    profile: 'Profile',
    settings: 'Settings',
    back: 'Back',
    seeAll: 'See all',
    save: 'Save',
    start: 'Start'
  },
  welcome: {
    title: 'FitLife',
    subtitle: 'Your fitness journey starts here',
    description: 'Transform your body, mind, and life with personalized workouts and progress tracking',
    getStarted: 'Get Started Free',
    haveAccount: 'I Already Have an Account',
    features: {
      smart: { title: 'Smart Workouts', desc: 'AI-powered plans' },
      track: { title: 'Track Progress', desc: 'Visual analytics' },
      goals: { title: 'Set Goals', desc: 'Stay motivated' },
      fast: { title: 'Fast Results', desc: 'HIIT & strength' }
    }
  },
  auth: {
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue your fitness journey',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      remember: 'Remember me',
      forgot: 'Forgot password?',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      errors: {
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 6 characters',
        invalid: 'Invalid email or password'
      }
    },
    register: {
      title: 'Create Account',
      subtitle: 'Start your fitness transformation today',
      name: 'Full Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      password: 'Password',
      passwordPlaceholder: 'Create a password',
      confirmPassword: 'Confirm Password',
      confirmPlaceholder: 'Confirm your password',
      agree: 'I agree to the',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      create: 'Create Account',
      haveAccount: 'Already have an account?',
      signIn: 'Sign in',
      errors: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
        passwordRequired: 'Password is required',
        passwordMin: 'Password must be at least 6 characters',
        passwordsNotMatch: 'Passwords do not match'
      }
    }
  },
  dashboard: {
    greeting: {
      morning: 'Good morning! Ready to crush it?',
      afternoon: 'Good afternoon! Keep moving!',
      evening: 'Good evening! Great time to workout!',
      hi: 'Hi'
    },
    stats: {
      workouts: 'Workouts',
      calories: 'Calories',
      minutes: 'Minutes',
      burned: 'Calories Burned',
      totalMinutes: 'Total Minutes',
      streak: 'days'
    },
    streak: {
      title: 'Current Streak',
      subtitle: "Keep pushing! You're doing great!"
    },
    week: {
      title: 'This Week',
      total: 'min total'
    },
    recommended: 'Recommended',
    achievements: 'Achievements',
    quickActions: {
      start: 'Start Workout',
      progress: 'My Progress',
      settings: 'Settings'
    },
    weight: {
      title: 'Weight Progress',
      current: 'Current Weight',
      height: 'Height',
      age: 'Age',
      cm: 'cm',
      kg: 'kg',
      years: 'years'
    }
  },
  workouts: {
    title: 'Workouts',
    subtitle: 'Choose your workout and start training',
    all: 'All',
    empty: 'No workouts found',
    emptyHint: 'Try selecting a different category',
    start: 'Start Workout',
    exercises: 'Exercises',
    similar: 'Similar Workouts',
    details: {
      minutes: 'min',
      calories: 'cal',
      exercises: 'ex.',
      sets: 'sets',
      reps: 'reps',
      kg: 'kg',
      seconds: 's'
    },
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    }
  },
  progress: {
    title: 'Your Progress',
    subtitle: 'Track your fitness journey',
    caloriesBurned: 'Calories Burned',
    workoutsDone: 'Workouts Done',
    weightChange: 'Weight Change',
    avgMood: 'Avg Mood',
    weeklyActivity: 'Weekly Activity',
    monthlyBreakdown: 'Monthly Breakdown',
    workouts: 'workouts',
    achievements: 'Achievements',
    week: 'Week'
  },
  profile: {
    stats: {
      height: 'Height',
      weight: 'Weight',
      age: 'Age',
      cm: 'cm',
      kg: 'kg'
    },
    menu: {
      settings: 'Settings',
      notifications: 'Notifications',
      achievements: 'Achievements',
      history: 'Workout History',
      activity: 'Activity Log',
      privacy: 'Privacy'
    },
    logout: 'Sign Out',
    level: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    goal: {
      lose: 'Lose Weight',
      maintain: 'Maintain',
      gain: 'Gain Mass'
    }
  },
  settings: {
    title: 'Settings',
    profile: 'Profile',
    name: 'Full Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    height: 'Height (cm)',
    weight: 'Weight (kg)',
    age: 'Age',
    goals: 'Fitness Goals',
    goal: 'Goal',
    level: 'Level',
    preferences: 'Preferences',
    notifications: 'Notifications',
    notificationsHint: 'Workout reminders and tips',
    sound: 'Sound Effects',
    soundHint: 'Play sounds during workouts',
    language: 'Language',
    save: 'Save Changes',
    goalOptions: {
      lose: 'Lose Weight',
      maintain: 'Maintain',
      gain: 'Gain Mass'
    },
    levelOptions: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    languageOptions: {
      ru: 'Русский',
      en: 'English'
    },
    darkMode: 'Dark Mode',
    darkModeHint: 'Coming soon'
  },
  workoutDetail: {
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    start: 'Start Workout',
    similar: 'Similar Workouts'
  }
}