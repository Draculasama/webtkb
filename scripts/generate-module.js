#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script tự động generate module
 * Usage: npm run generate:module -- UserName
 */

// Get module name from command line
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Vui lòng cung cấp tên module!');
  console.log('Usage: npm run generate:module -- UserName');
  process.exit(1);
}

const moduleName = args[0];
const moduleNameLower = moduleName.toLowerCase();
const moduleNameCamel = moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).charAt(0).toLowerCase() + moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).slice(1);
const moduleNameUpper = moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).charAt(0).toUpperCase() + moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).slice(1);

console.log(`🚀 Đang tạo module: ${moduleName}...`);

// Paths
const modulesDir = path.join(__dirname, '..', 'src', 'modules');
const moduleDir = path.join(modulesDir, moduleNameLower);

// Create module directory structure
const dirs = [
  moduleDir,
  path.join(moduleDir, 'types'),
  path.join(moduleDir, 'repository'),
  path.join(moduleDir, 'service'),
  path.join(moduleDir, 'hooks'),
  path.join(moduleDir, 'pages'),
  path.join(moduleDir, 'components'),
  path.join(moduleDir, 'components', 'css'),
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Templates
const typesTemplate = `import { BaseEntity } from '../../../core/types/base.types';

/**
 * ${moduleNameUpper} Entity
 */
export interface ${moduleNameUpper} extends BaseEntity {
}

/**
 * Create ${moduleNameUpper} DTO
 */
export interface Create${moduleNameUpper}Dto extends Omit<${moduleNameUpper}, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
}

/**
 * Update ${moduleNameUpper} DTO
 */
export interface Update${moduleNameUpper}Dto extends Partial<Create${moduleNameUpper}Dto> {
}
`;

const repositoryTemplate = `import { BaseRepository } from '../../../core/repository/base.repository';
import { ${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto } from '../types/${moduleNameLower}.types';

/**
 * ${moduleNameUpper} Repository
 */
export class ${moduleNameUpper}Repository extends BaseRepository<
  ${moduleNameUpper},
  Create${moduleNameUpper}Dto,
  Update${moduleNameUpper}Dto
> {
  protected resourcePath = '/${moduleNameLower}';

  // Thêm API calls riêng cho ${moduleNameUpper} ở đây
}

// Export singleton instance
export const ${moduleNameCamel}Repository = new ${moduleNameUpper}Repository();
`;

const serviceTemplate = `import { BaseService } from '../../../core/service/base.service';
import { ${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto } from '../types/${moduleNameLower}.types';
import { ${moduleNameCamel}Repository } from '../repository/${moduleNameLower}.repository';

/**
 * ${moduleNameUpper} Service
 */
export class ${moduleNameUpper}Service extends BaseService<
  ${moduleNameUpper},
  Create${moduleNameUpper}Dto,
  Update${moduleNameUpper}Dto
> {
  constructor() {
    super(${moduleNameCamel}Repository);
  }

  // Thêm business logic riêng cho ${moduleNameUpper} ở đây
}

// Export singleton instance
export const ${moduleNameCamel}Service = new ${moduleNameUpper}Service();
`;

const hooksTemplate = `import { createBaseHooks } from '../../../core/hooks/base.hooks';
import { ${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto } from '../types/${moduleNameLower}.types';
import { ${moduleNameCamel}Service } from '../service/${moduleNameLower}.service';

/**
 * ${moduleNameUpper} Hooks
 */
export const {
  // Query hooks
  useGetPage: useGet${moduleNameUpper}Page,
  useGetMany: useGetMany${moduleNameUpper},
  useCount: useCount${moduleNameUpper},
  useGetOne: useGetOne${moduleNameUpper},
  useExists: useExists${moduleNameUpper},
  useFindById: useFind${moduleNameUpper}ById,
  useFindByMa: useFind${moduleNameUpper}ByMa,
  
  // Mutation hooks
  useCreate: useCreate${moduleNameUpper},
  useUpdate: useUpdate${moduleNameUpper},
  useUpdateMany: useUpdateMany${moduleNameUpper},
  useRemove: useRemove${moduleNameUpper},
  useRemoveMany: useRemoveMany${moduleNameUpper},
  useSoftDelete: useSoftDelete${moduleNameUpper},
  useRestore: useRestore${moduleNameUpper},
} = createBaseHooks<${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto>('${moduleNameLower}', ${moduleNameCamel}Service);
`;

const pageComponentTemplate = `import React, { useState } from 'react';
import { Form, Input } from 'antd';
import BasePageLayout from '../../../core/components/BasePageLayout';
import BaseFormModal from '../../../core/components/BaseFormModal';
import { useBaseHandlers } from '../../../core/hooks/useBaseHandlers';
import {
  useGet${moduleNameUpper}Page,
  useGetMany${moduleNameUpper},
  useCreate${moduleNameUpper},
  useUpdate${moduleNameUpper},
  useRemove${moduleNameUpper},
  useFind${moduleNameUpper}ByMa,
} from '../hooks/${moduleNameLower}.hooks';
import { ${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto } from '../types/${moduleNameLower}.types';
import { ${moduleNameUpper}Table } from '../components/${moduleNameUpper}Table';
import { ${moduleNameUpper}Form } from '../components/${moduleNameUpper}Form';
import { ${moduleNameUpper}DetailModal } from '../components/${moduleNameUpper}DetailModal';

/**
 * ${moduleNameUpper} Page Component
 */
const ${moduleNameUpper}Page: React.FC = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [selectedMa, setSelectedMa] = useState<string | null | undefined>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Hooks
  const { data, isLoading } = useGet${moduleNameUpper}Page(pagination);
  const detailQuery = useFind${moduleNameUpper}ByMa(selectedMa || '', { enabled: !!selectedMa });
  const createMutation = useCreate${moduleNameUpper}();
  const updateMutation = useUpdate${moduleNameUpper}();
  const deleteMutation = useRemove${moduleNameUpper}();
  const allDataQuery = useGetMany${moduleNameUpper}();

  const handlers = useBaseHandlers<${moduleNameUpper}, Create${moduleNameUpper}Dto, Update${moduleNameUpper}Dto>({
    form,
    createMutation,
    updateMutation,
    deleteMutation,
    allDataQuery,
  });

  return (
    <BasePageLayout loading={isLoading}>
      <${moduleNameUpper}Table
        data={handlers.filteredData.length ? handlers.filteredData : data?.items || []}
        loading={isLoading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: data?.total || 0,
        }}
        onPageChange={(p) => setPagination({ page: p.current, size: p.pageSize })}
        onAdd={handlers.handleAdd}
        onEdit={handlers.handleEdit}
        onDelete={handlers.handleDelete}
        onSearch={handlers.handleSearch}
        onRowClick={(r: ${moduleNameUpper}) => {
          setSelectedMa(r.ma);
          setDetailOpen(true);
        }}
      />

      <BaseFormModal
        open={handlers.modalOpen}
        form={form}
        onOk={handlers.handleModalOk}
        onCancel={handlers.handleModalCancel}
        mode={handlers.editingRecord ? "edit" : "create"}
      >
        <${moduleNameUpper}Form form={form} />
      </BaseFormModal>

      <${moduleNameUpper}DetailModal
        open={detailOpen}
        loading={detailQuery.isLoading}
        detail={detailQuery.data}
        onClose={() => {
          setDetailOpen(false);
          setSelectedMa(null);
        }}
      />
    </BasePageLayout>
  );
};

export default ${moduleNameUpper}Page;
`;

const indexTemplate = `export * from './types/${moduleNameLower}.types';
export * from './repository/${moduleNameLower}.repository';
export * from './service/${moduleNameLower}.service';
export * from './hooks/${moduleNameLower}.hooks';
export { default as ${moduleNameUpper}Page } from './pages/${moduleNameUpper}Page';
`;

const tableComponentTemplate = `// modules/${moduleNameLower}/components/${moduleNameUpper}Table.tsx
import type { ColumnsType } from 'antd/es/table';
import BaseDataTable from '../../../core/components/BaseDataTable';
import { ${moduleNameUpper} } from '../types/${moduleNameLower}.types';
import './css/${moduleNameUpper}Table.css';

interface ${moduleNameUpper}TableProps {
  data: ${moduleNameUpper}[];
  loading: boolean;
  pagination: any;
  onPageChange: (p: any) => void;
  onAdd: () => void;
  onEdit: (r: ${moduleNameUpper}) => void;
  onDelete: (r: ${moduleNameUpper}) => void;
  onSearch: (v: string) => void;
  onRowClick: (r: ${moduleNameUpper}) => void;
}

export const ${moduleNameUpper}Table = ({
  data,
  loading,
  pagination,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
  onSearch,
  onRowClick,
}: ${moduleNameUpper}TableProps) => {
  const columns: ColumnsType<${moduleNameUpper}> = [
    {
      title: 'Mã',
      dataIndex: 'ma',
      key: 'ma',
      width: 120,
      onCell: (record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' },
      }),
    },
    // TODO: Add more columns here
  ];

  return (
    <BaseDataTable
      title="${moduleNameUpper}"
      data={data}
      loading={loading}
      columns={columns}
      pagination={pagination}
      onPageChange={onPageChange}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      onSearch={onSearch}
      rowKey="id"
    />
  );
};
`;

const formComponentTemplate = `// modules/${moduleNameLower}/components/${moduleNameUpper}Form.tsx
import { Form, Input, FormInstance } from 'antd';
import './css/${moduleNameUpper}Form.css';
interface ${moduleNameUpper}FormProps {
  form: FormInstance;
}

export const ${moduleNameUpper}Form = ({ form }: ${moduleNameUpper}FormProps) => {
  return (
    <>
      <Form.Item
        label="Mã"
        name="ma"
        rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
      >
        <Input placeholder="Nhập mã..." />
      </Form.Item>

      {/* TODO: Add more form fields here */}
    </>
  );
};
`;

const detailModalComponentTemplate = `// modules/${moduleNameLower}/components/${moduleNameUpper}DetailModal.tsx
import { Descriptions } from 'antd';
import BaseDetailModal from '../../../core/components/BaseDetailModal';
import { ${moduleNameUpper} } from '../types/${moduleNameLower}.types';
import { BaseDetailDescriptions } from '../../../core/components/BaseDetailDescriptions';
import './css/${moduleNameUpper}DetailModal.css';
interface ${moduleNameUpper}DetailModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  detail: ${moduleNameUpper} | undefined;
}

export const ${moduleNameUpper}DetailModal = ({
  open,
  onClose,
  loading,
  detail,
}: ${moduleNameUpper}DetailModalProps) => {
  return (
    <BaseDetailModal<${moduleNameUpper}>
      title="Chi tiết ${moduleNameUpper}"
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
`;

// CSS templates
const tableCssTemplate = ``;
const formCssTemplate = ``;
const detailModalCssTemplate = ``;

// Write files
const files = [
  { path: path.join(moduleDir, 'types', `${moduleNameLower}.types.ts`), content: typesTemplate },
  { path: path.join(moduleDir, 'repository', `${moduleNameLower}.repository.ts`), content: repositoryTemplate },
  { path: path.join(moduleDir, 'service', `${moduleNameLower}.service.ts`), content: serviceTemplate },
  { path: path.join(moduleDir, 'hooks', `${moduleNameLower}.hooks.ts`), content: hooksTemplate },
  { path: path.join(moduleDir, 'pages', `${moduleNameUpper}Page.tsx`), content: pageComponentTemplate },
  { path: path.join(moduleDir, 'components', `${moduleNameUpper}Table.tsx`), content: tableComponentTemplate },
  { path: path.join(moduleDir, 'components', `${moduleNameUpper}Form.tsx`), content: formComponentTemplate },
  { path: path.join(moduleDir, 'components', `${moduleNameUpper}DetailModal.tsx`), content: detailModalComponentTemplate },
  { path: path.join(moduleDir, 'components', 'css', `${moduleNameUpper}Table.css`), content: tableCssTemplate },
  { path: path.join(moduleDir, 'components', 'css', `${moduleNameUpper}Form.css`), content: formCssTemplate },
  { path: path.join(moduleDir, 'components', 'css', `${moduleNameUpper}DetailModal.css`), content: detailModalCssTemplate },
  { path: path.join(moduleDir, 'index.ts'), content: indexTemplate },
];

files.forEach(({ path: filePath, content }) => {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created: ${filePath}`);
});

/// Auto update adminRoutes.tsx
const routerPath = path.join(__dirname, '..', 'src', 'router', 'adminRoutes.tsx');

if (fs.existsSync(routerPath)) {
  let routerContent = fs.readFileSync(routerPath, 'utf8');

  const routePath = `path="${moduleNameLower}"`;

  if (!routerContent.includes(routePath)) {
    // ===== Add import =====
    const importStatement = `import { ${moduleNameUpper}Page } from '@modules/${moduleNameLower}';`;
    const importMarker = '// ===== MODULE IMPORTS END =====';
    
    if (routerContent.includes(importMarker)) {
      routerContent = routerContent.replace(
        importMarker,
        `${importStatement}\n${importMarker}`
      );
    }

    // ===== Add route =====
    const routeStatement = `    <Route path="${moduleNameLower}" element={<${moduleNameUpper}Page />} />`;
    const routeMarker = '{/* ===== MODULE ROUTES END ===== */}';
    
    if (routerContent.includes(routeMarker)) {
      routerContent = routerContent.replace(
        routeMarker,
        `${routeStatement}\n    ${routeMarker}`
      );
    }

    fs.writeFileSync(routerPath, routerContent, "utf8");
    console.log(`✅ Updated adminRoutes.tsx with ${moduleNameUpper} route`);
  } else {
    console.log(`ℹ️ Route already exists`);
  }
} else {
  console.log(`⚠️  Không tìm thấy adminRoutes.tsx`);
}


console.log(`\n✨ Module ${moduleNameUpper} đã được tạo thành công!`);
console.log(`\n📁 Cấu trúc module:`);
console.log(`   modules/${moduleNameLower}/`);
console.log(`   ├── types/`);
console.log(`   │   └── ${moduleNameLower}.types.ts`);
console.log(`   ├── repository/`);
console.log(`   │   └── ${moduleNameLower}.repository.ts`);
console.log(`   ├── service/`);
console.log(`   │   └── ${moduleNameLower}.service.ts`);
console.log(`   ├── hooks/`);
console.log(`   │   └── ${moduleNameLower}.hooks.ts`);
console.log(`   ├── components/`);
console.log(`   │   ├── ${moduleNameUpper}Table.tsx`);
console.log(`   │   ├── ${moduleNameUpper}Form.tsx`);
console.log(`   │   └── ${moduleNameUpper}DetailModal.tsx`);
console.log(`   ├── pages/`);
console.log(`   │   └── ${moduleNameUpper}Page.tsx`);
console.log(`   └── index.ts`);
console.log(`\n📝 Import đã được thêm vào adminRoutes.tsx:`);
console.log(`   - Route: /${moduleNameLower}`);
