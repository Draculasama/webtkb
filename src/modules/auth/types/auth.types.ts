export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user?: {
    id: number | string;
    username: string;
    hoTen?: string;
    role?: string;
    vaiTro?: string;
  };
}
