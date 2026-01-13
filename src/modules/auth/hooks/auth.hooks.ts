import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { authService } from "../service/auth.service";
import { LoginDto } from "../types/auth.types";
import { VaiTro } from "@modules/user";


export const useAuth = () => {
  const useLogin = () => {
    return useMutation({
      mutationFn: (payload: LoginDto) => authService.login(payload),
      onSuccess: (data: any) => {
        if (data?.accessToken) {
          localStorage.setItem("token", data.accessToken);
        } else {
          message.error("Đăng nhập thất bại");
          return;
        }
        const userInfo = data?.payload;
        localStorage.setItem("user", JSON.stringify(userInfo));
        const userRole = userInfo?.vaiTro;
        const allowedRoles = VaiTro;
        if (Object.values(allowedRoles).includes(userRole)) {
          message.success(`Xin chào ${userInfo?.hoTen}!`);

          setTimeout(() => {
            window.location.href = "/";
          }, 100);
        } else {
          message.error(
            `Truy cập bị từ chối! Vai trò của bạn là: "${userRole}"`,
          );
          authService.logout();
        }
      },

      onError: (error: any) => {
        console.error("Lỗi đăng nhập:", error);
        const msg =
          error?.response?.data?.message?.message ||
          error?.response?.data?.message ||
          "Đăng nhập thất bại!";
        message.error(typeof msg === "string" ? msg : JSON.stringify(msg));
      },
    });
  };

  return { useLogin, logout: authService.logout };
};
