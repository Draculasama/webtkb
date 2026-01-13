import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ai, aiDto } from "../types/ai.types";
import { aiService } from "../service/ai.service";

/**
 * Ai Hooks - Custom hooks cho AI module
 */

export const useThongKeAi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: aiDto) => aiService.thongKeAi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai"] });
    },
  });
};
