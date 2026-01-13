// modules/ai/components/AiDetailModal.tsx
import { Descriptions } from "antd";
import BaseDetailModal from "../../../core/components/BaseDetailModal";
import { Ai } from "../types/ai.types";
import { BaseDetailDescriptions } from "../../../core/components/BaseDetailDescriptions";
import "./css/AiDetailModal.css";
interface AiDetailModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  detail: Ai | undefined;
}

export const AiDetailModal = ({
  open,
  onClose,
  loading,
  detail,
}: AiDetailModalProps) => {
  return (
    <BaseDetailModal<Ai>
      title="Chi tiết Ai"
      open={open}
      onClose={onClose}
      loading={loading}
      detail={detail}
    >
      {(data) => (
        <BaseDetailDescriptions
          data={data}
          items={[{ label: "Mã", key: "ma" }]}
        />
      )}
    </BaseDetailModal>
  );
};
