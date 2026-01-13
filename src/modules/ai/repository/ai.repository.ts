import { BaseRepository } from "../../../core/repository/base.repository";
import { Ai, CreateAiDto, UpdateAiDto, aiDto } from "../types/ai.types";

/**
 * Ai Repository
 */
export class AiRepository extends BaseRepository<Ai, CreateAiDto, UpdateAiDto> {
  protected resourcePath = "/ai";
  async thongKeAi(data: aiDto): Promise<Ai> {
    const params = new URLSearchParams();
    if (data.text) params.append("text", data.text);

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/question?${queryString}`
      : `${this.resourcePath}/question`;

    return this.get<Ai>(url);
  }
  // Thêm API calls riêng cho Ai ở đây
}

// Export singleton instance
export const aiRepository = new AiRepository();
