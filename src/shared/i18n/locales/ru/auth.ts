export const ruAuth = {
  login: {
    title: 'Вход',
    subtitle: 'Войдите, чтобы продолжить',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Пароль',
    passwordPlaceholder: 'Минимум 8 символов',
    submit: 'Войти',
    noAccount: 'Нет аккаунта?',
    registerLink: 'Зарегистрироваться',
  },
  logout: 'Выйти',
  gate: {
    title: 'Войдите в аккаунт',
    description:
      'Чтобы видеть корзину, заказы и профиль, войдите или создайте аккаунт. Это займёт минуту.',
    login: 'Войти',
    register: 'Создать аккаунт',
  },
  register: {
    title: 'Регистрация',
    subtitle: 'Создайте аккаунт за минуту',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Email',
    phone: 'Телефон',
    password: 'Пароль',
    privacyPolicy: 'Я принимаю политику конфиденциальности',
    submit: 'Создать аккаунт',
    haveAccount: 'Уже есть аккаунт?',
    loginLink: 'Войти',
  },
} as const;
