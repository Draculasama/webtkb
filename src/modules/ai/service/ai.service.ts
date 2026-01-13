import { BaseService } from "../../../core/service/base.service";
import { Ai, aiDto, CreateAiDto, UpdateAiDto } from "../types/ai.types";
import { aiRepository } from "../repository/ai.repository";

/**
 * Ai Service
 */
class AiService extends BaseService<Ai, CreateAiDto, UpdateAiDto> {
  constructor() {
    super(aiRepository);
  }

  async thongKeAi(data: aiDto): Promise<Ai> {
    return aiRepository.thongKeAi(data);
  }

  // Thêm business logic riêng cho Ai ở đây
}

// Export singleton instance
export const aiService = new AiService();
