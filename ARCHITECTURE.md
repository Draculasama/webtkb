# Repository Pattern Frontend - React TypeScript

Kiến trúc frontend với Repository Pattern, tuân theo chuẩn module hóa theo mô hình:
**API → Repository → Service → Hook → UI Component**

## 📁 Cấu trúc thư mục

```
src/
├── core/                          # Base classes và utilities
│   ├── api/
│   │   └── base-api.client.ts    # BaseApiClient với Axios
│   ├── config/
│   │   └── api.config.ts          # API configuration
│   ├── repository/
│   │   └── base.repository.ts     # BaseRepository với CRUD methods
│   ├── service/
│   │   └── base.service.ts        # BaseService layer
│   ├── hooks/
│   │   └── base.hooks.ts          # Base hooks factory với React Query
│   ├── components/
│   │   ├── BaseTable.tsx          # Base Table component
│   │   ├── BaseForm.tsx           # Base Form component
│   │   └── Pagination.tsx         # Pagination component
│   └── types/
│       └── base.types.ts          # Base interfaces & types
│
├── modules/                       # Feature modules
│   └── user/                      # Ví dụ: User module
│       ├── types/
│       ├── repository/
│       ├── service/
│       ├── hooks/
│       ├── components/
│       └── index.ts
```

## 🚀 Bắt đầu

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình API

```bash
cp .env.example .env
```

### 3. Chạy ứng dụng

```bash
npm start
```

## 📦 Tạo module mới

```bash
npm run generate:module -- ProductName
```

Script sẽ tự động tạo đầy đủ: Types, Repository, Service, Hooks, Components

## 🎯 Sử dụng

```typescript
import { useGetProductPage, useCreateProduct } from './modules/product';
```

Xem chi tiết trong `README_FULL.md`
