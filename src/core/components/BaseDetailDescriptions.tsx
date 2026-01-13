import { Descriptions } from "antd";

interface BaseDetailDescriptionsProps<T> {
  data: T;
  items: {
    label: string;
    key: keyof T | string;
    render?: (value: any, data: T) => React.ReactNode;
  }[];
}

export function BaseDetailDescriptions<T>({
  data,
  items,
}: BaseDetailDescriptionsProps<T>) {
  return (
    <Descriptions bordered column={1}>
      {items.map((it) => {
        const value = (data as any)?.[it.key];

        return (
          <Descriptions.Item key={it.label} label={it.label}>
            {it.render ? it.render(value, data) : value}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
}
