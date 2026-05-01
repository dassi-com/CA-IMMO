export interface RegisterDto {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  role?: "OWNER" | "TENANT";
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}