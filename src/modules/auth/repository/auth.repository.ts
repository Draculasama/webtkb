import axios from "axios";
import { LoginDto, LoginResponse } from "../types/auth.types";
import { BaseRepository } from "../../../core/repository/base.repository";

export class AuthRepository extends BaseRepository<any, any, any> {
  protected resourcePath = "/auth";
  async login(payload: LoginDto) {
    return this.post<LoginResponse>(`${this.resourcePath}/login`, payload);
  }
}

export const authRepository = new AuthRepository();
