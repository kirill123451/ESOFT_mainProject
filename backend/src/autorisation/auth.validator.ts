import { z } from 'zod'

export const regForm = z.object({
    email: z.string().email('email некорректен'),
    password: z.string().min(8, 'Минимальная длина пароля 8 символов')
    .max(32, "Максимальная длина пароля не более 32 символов")
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную буквку')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
    name: z.string()
    .min(2, 'Имя должно содержать не менее 2-х символов')
    .max(32, 'Имя должно содержать не более 32-х символов')
    .optional()
})

export const logForm = z.object({
    email: z.string().email('email некорректен'),
    password: z.string().min(1, 'Пароль обязателен')
})

export const passwordResetRequestForm = z.object({
  email: z.string().email('Некорректный email').min(5, 'Email слишком короткий'),
})

export const passwordResetForm = z.object({
  token: z.string().min(20, 'Токен слишком короткий'),
  newPassword: z.string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})