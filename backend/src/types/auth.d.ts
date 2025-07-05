export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}