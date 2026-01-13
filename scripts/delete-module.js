#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script tự động xóa module
 * Usage: npm run delete:module ModuleName
 */

// Get module name from command line
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Vui lòng cung cấp tên module cần xóa!');
  console.log('Usage: npm run delete:module ModuleName');
  process.exit(1);
}

const moduleName = args[0];
const moduleNameLower = moduleName.toLowerCase();
const moduleNameCamel = moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).charAt(0).toLowerCase() + moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).slice(1);
const moduleNameUpper = moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).charAt(0).toUpperCase() + moduleName.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase()).slice(1);

console.log(`🗑️  Đang xóa module: ${moduleName}...`);

// Paths
const modulesDir = path.join(__dirname, '..', 'src', 'modules');
const moduleDir = path.join(modulesDir, moduleNameLower);
const srcDir = path.join(__dirname, '..', 'src');
const routerPath = path.join(__dirname, '..', 'src', 'router', 'adminRoutes.tsx');

// Check if module exists
if (!fs.existsSync(moduleDir)) {
  console.error(`❌ Module ${moduleName} không tồn tại!`);
  console.log(`📁 Đường dẫn: ${moduleDir}`);
  process.exit(1);
}

// Confirm deletion
console.log(`⚠️  Bạn có chắc chắn muốn xóa module ${moduleNameUpper}?`);
console.log(`📁 Đường dẫn: ${moduleDir}`);

// Delete module directory
function deleteFolderRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const curPath = path.join(directoryPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}

deleteFolderRecursive(moduleDir);
console.log(`✅ Đã xóa thư mục module: ${moduleDir}`);

// Find and delete files that import from the deleted module
const deletedFiles = [];

function findFilesWithModuleImport(directory) {
  if (!fs.existsSync(directory)) return;
  
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.lstatSync(itemPath);
    
    if (stat.isDirectory()) {
      // Skip the modules directory itself and node_modules
      if (item === 'node_modules' || itemPath === moduleDir) continue;
      findFilesWithModuleImport(itemPath);
    } else if (stat.isFile() && /\.(ts|tsx|js|jsx)$/.test(item)) {
      // Skip router file and App.tsx - they will be handled separately
      if (itemPath === routerPath) continue;
      
      // Skip critical system files
      const criticalFiles = ['App.tsx', 'main.tsx', 'index.tsx', 'vite-env.d.ts'];
      if (criticalFiles.includes(item)) continue;
      
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // Check for imports from the deleted module
        // Match patterns like: from './modules/modulename', from '@modules/modulename'
        const importPatterns = [
          // @modules/module-name pattern (new alias)
          new RegExp(`from\\s+['"]@modules\\/${moduleNameLower}(\\/[^'"]*)?['"]`, 'g'),
          // Relative path patterns
          new RegExp(`from\\s+['\"]\\.\\.?\\/modules\\/${moduleNameLower}(\\/[^'\"]*)?['\"]`, 'g'),
          new RegExp(`from\\s+['\"][^'\"]*\\/modules\\/${moduleNameLower}(\\/[^'\"]*)?['\"]`, 'g'),
        ];
        
        const hasModuleImport = importPatterns.some(pattern => pattern.test(content));
        
        if (hasModuleImport) {
          fs.unlinkSync(itemPath);
          deletedFiles.push(itemPath);
          console.log(`🗑️  Đã xóa file có import từ module: ${itemPath}`);
        }
      } catch (err) {
        console.error(`⚠️  Lỗi khi đọc file ${itemPath}: ${err.message}`);
      }
    }
  }
}

findFilesWithModuleImport(srcDir);
if (deletedFiles.length > 0) {
  console.log(`✅ Đã xóa ${deletedFiles.length} file có import từ module ${moduleNameLower}`);
}

// Update adminRoutes.tsx - remove import and route
if (fs.existsSync(routerPath)) {
  let routerContent = fs.readFileSync(routerPath, 'utf8');
  
  // Remove import statement - match both relative path and @modules alias
  const importPatterns = [
    // @modules/module-name pattern
    new RegExp(
      `import\\s+\\{\\s*${moduleNameUpper}Page\\s*\\}\\s+from\\s+['"]@modules\\/${moduleNameLower}['"];?\\s*\\n?`,
      'g'
    ),
    // ../modules/module-name pattern (legacy)
    new RegExp(
      `import\\s+\\{\\s*${moduleNameUpper}Page\\s*\\}\\s+from\\s+['\"]\\.\\.?\\/modules\\/${moduleNameLower}['\"];?\\s*\\n?`,
      'g'
    ),
  ];
  
  for (const pattern of importPatterns) {
    routerContent = routerContent.replace(pattern, '');
  }
  
  // Remove route - flexible pattern to match various formats
  const routePatterns = [
    // <Route path="module-name" element={<ModuleNamePage />} />
    new RegExp(
      `\\s*<Route\\s+path=["']${moduleNameLower}["']\\s+element=\\{<${moduleNameUpper}Page\\s*\\/?>\\}\\s*\\/>\\s*\\n?`,
      'g'
    ),
    // <Route path="module-name" element={<ModuleNamePage />}></Route>
    new RegExp(
      `\\s*<Route\\s+path=["']${moduleNameLower}["']\\s+element=\\{<${moduleNameUpper}Page\\s*\\/?>\\}\\s*>[\\s\\S]*?<\\/Route>\\s*\\n?`,
      'g'
    ),
  ];
  
  for (const pattern of routePatterns) {
    routerContent = routerContent.replace(pattern, '');
  }
  
  fs.writeFileSync(routerPath, routerContent, 'utf8');
  console.log(`✅ Đã xóa import và route trong adminRoutes.tsx`);
} else {
  console.log(`⚠️  Không tìm thấy adminRoutes.tsx`);
}

// Update AdminPages.tsx - remove menu item
const adminPagesPath = path.join(__dirname, '..', 'src', 'admin', 'pages', 'AdminPages.tsx');
if (fs.existsSync(adminPagesPath)) {
  let adminPagesContent = fs.readFileSync(adminPagesPath, 'utf8');
  
  // Remove menu item patterns
  // Pattern 1: Standalone menu item { key: "module-name", ... }
  const standaloneMenuPattern = new RegExp(
    `\\s*\\{\\s*key:\\s*["']${moduleNameLower}["'][\\s\\S]*?\\}\\s*,?`,
    'g'
  );
  
  // Pattern 2: Nested menu item in children array { key: "module-name", ... }
  const nestedMenuPattern = new RegExp(
    `\\s*\\{\\s*key:\\s*["']${moduleNameLower}["'],\\s*icon:[^}]+label:[^}]+\\}\\s*,?`,
    'g'
  );
  
  const originalLength = adminPagesContent.length;
  adminPagesContent = adminPagesContent.replace(standaloneMenuPattern, '');
  adminPagesContent = adminPagesContent.replace(nestedMenuPattern, '');
  
  // Clean up any double commas or trailing commas before ]
  adminPagesContent = adminPagesContent.replace(/,\s*,/g, ',');
  adminPagesContent = adminPagesContent.replace(/,\s*\]/g, ']');
  
  if (adminPagesContent.length !== originalLength) {
    fs.writeFileSync(adminPagesPath, adminPagesContent, 'utf8');
    console.log(`✅ Đã xóa menu item trong AdminPages.tsx`);
  }
} else {
  console.log(`⚠️  Không tìm thấy AdminPages.tsx`);
}

console.log(`\n✨ Module ${moduleNameUpper} đã được xóa thành công!`);
console.log(`\n📝 Các thay đổi:`);
console.log(`   ✅ Đã xóa thư mục: modules/${moduleNameLower}/`);
console.log(`   ✅ Đã xóa import trong adminRoutes.tsx`);
console.log(`   ✅ Đã xóa route: /${moduleNameLower}`);
console.log(`   ✅ Đã xóa menu trong AdminPages.tsx`);
if (deletedFiles.length > 0) {
  console.log(`   ✅ Đã xóa ${deletedFiles.length} file có import từ module`);
}
