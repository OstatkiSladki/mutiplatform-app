export const ruErrors = {
  validation: {
    required: 'Обязательное поле',
    email: 'Введите корректный email',
    passwordMin: 'Пароль должен содержать минимум 8 символов',
    passwordComplexity:
      'Пароль должен содержать заглавную и строчную буквы, цифру и спецсимвол',
    phoneInvalid: 'Введите номер в формате +7 (900) 000-00-00',
    nameInvalid: 'Допустимы только буквы, пробел и дефис',
    privacyPolicy: 'Необходимо принять политику конфиденциальности',
  },
  api: {
    invalidCredentials: 'Неверный email или пароль',
    emailAlreadyExists: 'Пользователь с таким email уже существует',
    sessionExpired: 'Сессия истекла, войдите снова',
    notFound: 'Запись не найдена',
    networkError: 'Нет соединения с сервером',
    unknown: 'Что-то пошло не так. Попробуйте ещё раз',
  },
} as const;
