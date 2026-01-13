// modules/user/components/UserDetailModal.tsx
import { Descriptions } from 'antd';
import BaseDetailModal from '../../../core/components/BaseDetailModal';
import { User } from '../types/user.types';
import { BaseDetailDescriptions } from '../../../core/components/BaseDetailDescriptions';
import './css/UserDetailModal.css';
interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  detail: User | undefined;
}

export const UserDetailModal = ({
  open,
  onClose,
  loading,
  detail,
}: UserDetailModalProps) => {
  return (
    <BaseDetailModal<User>
      title="Chi tiết User"
      open={open}
      onClose={onClose}
      loading={loading}
      detail={detail}
    >
      {(data) => <BaseDetailDescriptions
      data={data}
       items={[
           { label: 'Mã', key: 'ma' },    
          ]}
    />}
    </BaseDetailModal>
  );
};
