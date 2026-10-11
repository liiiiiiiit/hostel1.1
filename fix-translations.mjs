#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/App.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// الگوهای تبدیل
const replacements = [
  // Hostel
  { pattern: /hostel\.translations\[locale\]\.name/g, replacement: 'hostel.name' },
  { pattern: /hostel\.translations\[locale\]\.description/g, replacement: 'hostel.description' },
  { pattern: /hostel\?\.translations\[locale\]\.name/g, replacement: 'hostel?.name' },
  
  // Job
  { pattern: /job\.translations\[locale\]\.title/g, replacement: 'job.title' },
  { pattern: /job\.translations\[locale\]\.description/g, replacement: 'job.description' },
  { pattern: /job\.translations\[locale\]\.requirements/g, replacement: 'job.requirements' },
  { pattern: /job\?\.translations\[locale\]\.title/g, replacement: 'job?.title' },
  
  // Room
  { pattern: /room\.translations\[locale\]\.name/g, replacement: 'room.name' },
  { pattern: /room\.translations\[locale\]\.description/g, replacement: 'room.description' },
  { pattern: /r\.translations\[locale\]\.name/g, replacement: 'r.name' },
  { pattern: /r\.translations\[locale\]\.title/g, replacement: 'r.title' },
  
  // Business
  { pattern: /b\.translations\[locale\]\.name/g, replacement: 'b.name' },
  { pattern: /biz\.translations\[locale\]\.name/g, replacement: 'biz.name' },
  { pattern: /biz\.translations\[locale\]\.description/g, replacement: 'biz.description' },
  
  // Article
  { pattern: /article\.translations\[locale\]\.title/g, replacement: 'article.title' },
  { pattern: /article\.translations\[locale\]\.excerpt/g, replacement: 'article.excerpt' },
  { pattern: /article\.translations\[locale\]\.content/g, replacement: 'article.content' },
  { pattern: /a\.translations\[locale\]\.title/g, replacement: 'a.title' },
  
  // Variables
  { pattern: /h\.translations\[locale\]\.name/g, replacement: 'h.name' },
  { pattern: /j\.translations\[locale\]\.title/g, replacement: 'j.title' },
  
  // Search filters
  { pattern: /h\.translations\[locale\]\.name\.toLowerCase\(\)/g, replacement: 'h.name.toLowerCase()' },
  { pattern: /j\.translations\[locale\]\.title\.toLowerCase\(\)/g, replacement: 'j.title.toLowerCase()' },
  { pattern: /b\.translations\[locale\]\.name\.toLowerCase\(\)/g, replacement: 'b.name.toLowerCase()' },
  { pattern: /a\.translations\[locale\]\.title\.toLowerCase\(\)/g, replacement: 'a.title.toLowerCase()' },
];

// اعمال تبدیل‌ها
for (const { pattern, replacement } of replacements) {
  content = content.replace(pattern, replacement);
}

// حذف ارجاعات locale از destructuring
content = content.replace(/const \{ t, locale \} = useApp\(\);/g, 'const { t } = useApp();');
content = content.replace(/const \{ t, locale, user \} = useApp\(\);/g, 'const { t, user } = useApp();');
content = content.replace(/const \{ t, user, locale \} = useApp\(\);/g, 'const { t, user } = useApp();');

// ذخیره فایل
fs.writeFileSync(filePath, content, 'utf-8');

console.log('✅ App.tsx با موفقیت به‌روزرسانی شد');
