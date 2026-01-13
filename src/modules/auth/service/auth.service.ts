import { authRepository } from "../repository/auth.repository";
import { LoginDto } from "../types/auth.types";

export class AuthService {
  async login(payload: LoginDto) {
    const cleanPayload = {
      username: payload.username.trim(),
      password: payload.password.trim(),
    };
    const response = await authRepository.login(cleanPayload);
    const data = response;
    if (data && data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }
    return data;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
}

export const authService = new AuthService();
