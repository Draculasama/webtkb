import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_CONFIG, getAuthToken } from "../config/api.config";

/**
 * Base API Client using Axios
 */
export class BaseApiClient {
  protected axiosInstance: AxiosInstance;
  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        ...API_CONFIG.headers,
        ...(localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request/response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor - handle errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
        }
        return Promise.reject(error);
      },
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(
      url,
      config,
    );
    return response.data;
  }

  protected async post<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );
    return response.data;
  }

  protected async put<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );
    return response.data;
  }

  /**
   * DELETE request
   */
  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config,
    );
    return response.data;
  }

  /**
   * PATCH request
   */
  protected async patch<T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config,
    );
    return response.data;
  }
}
