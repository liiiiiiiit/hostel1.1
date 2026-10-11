# Armenia Life Hub

یک پلتفرم چندزبانه برای کمک به گردشگران، دانشجویان بین‌المللی، ساکنان خارجی و جویندگان کار در ارمنستان.

## 🌟 ویژگی‌ها

### ماژول‌های اصلی
- **سیستم رزرو هاستل**: ۶ هاستل نمونه با مدیریت موجودی و جلوگیری از رزرو تکراری
- **پلتفرم استخدام**: ۱۲ آگهی شغلی با سیستم درخواست کار
- **دایرکتوری خدمات محلی**: ۲۵ کسب‌وکار در دسته‌بندی‌های مختلف
- **راهنمای ارمنستان**: ۲۰ مقاله آموزشی در موضوعات مختلف

### پشتیبانی چندزبانه
- 🇬🇧 English (انگلیسی)
- 🇷🇺 Русский (روسی)
- 🇦🇲 Հայերեն (ارمنی)
- 🇮🇷 فارسی (فارسی - RTL)

### نقش‌های کاربری
- **SUPER_ADMIN**: دسترسی کامل به تمام بخش‌ها
- **HOSTEL_MANAGER**: مدیریت هاستل‌ها و رزروها
- **EMPLOYER**: مدیریت آگهی‌های شغلی
- **JOB_SEEKER**: ارسال درخواست کار
- **GUEST**: مرور عمومی و رزرو

## 🛠️ معماری فنی

### Frontend (پیاده‌سازی شده)
- **React 18** با TypeScript
- **React Router** برای مسیریابی
- **Tailwind CSS** برای استایل‌دهی
- **Lucide React** برای آیکون‌ها
- **localStorage** برای شبیه‌سازی پایگاه داده

### Backend (ساختار آماده برای PostgreSQL)
- **Node.js** با Express.js (ساختار API آماده)
- **PostgreSQL** به عنوان پایگاه داده اصلی
- **Prisma ORM** برای مدیریت پایگاه داده
- **IndexedDB (Dexie.js)** برای شبیه‌سازی در محیط توسعه

### ساختار پروژه
```
src/
├── api/              # API Layer (شبیه‌سازی Express.js)
├── database/         # Database Schema (Dexie.js + Prisma)
├── services/         # Service Layer (Business Logic)
├── components/       # React Components
├── data/             # Static Data & Constants
├── i18n.ts          # Translations
├── store.ts         # Data Access Layer
└── App.tsx          # Main Application

prisma/
└── schema.prisma    # PostgreSQL Schema (آماده برای migration)
```

## 🚀 شروع سریع

### نصب وابستگی‌ها
```bash
npm install
```

### اجرای در حالت توسعه
```bash
npm run dev
```

### ساخت برای تولید
```bash
npm run build
```

## 🔐 حساب‌های آزمایشی

| نقش | ایمیل | رمز عبور |
|-----|--------|----------|
| Super Admin | admin@demo.example.com | DemoAdmin!2026#Hub |
| Hostel Manager | hostel.manager@demo.example.com | DemoHostel!2026#Hub |
| Employer | employer@demo.example.com | DemoEmployer!2026#Hub |
| Job Seeker | jobseeker@demo.example.com | DemoSeeker!2026#Hub |
| Guest | guest@demo.example.com | DemoGuest!2026#Hub |

## 🗄️ مهاجرت به PostgreSQL واقعی

### مرحله ۱: نصب Prisma
```bash
npm install prisma @prisma/client
npx prisma init
```

### مرحله ۲: تنظیم DATABASE_URL
فایل `.env` را ایجاد کنید:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/armenia_life_hub?schema=public"
```

### مرحله ۳: اجرای Migration
```bash
npx prisma migrate dev --name init
```

### مرحله ۴: Seed کردن پایگاه داده
```bash
npx prisma db seed
```

### مرحله ۵: تغییر Service Layer
فایل‌های `src/services/*.ts` را تغییر دهید تا از Prisma Client استفاده کنند:

```typescript
// مثال: auth.service.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const AuthService = {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    // ... rest of the logic
  }
};
```

### مرحله ۶: ایجاد Express.js Server
یک سرور Express.js جداگانه ایجاد کنید:

```bash
mkdir backend
cd backend
npm init -y
npm install express cors helmet bcryptjs jsonwebtoken @prisma/client
```

سپس API routes را از `src/api/index.ts` به سرور Express منتقل کنید.

## 📊 ساختار پایگاه داده

### جداول اصلی
- **users**: اطلاعات کاربران و نقش‌ها
- **hostels**: اطلاعات هاستل‌ها
- **hostel_translations**: ترجمه‌های هاستل (4 زبان)
- **room_types**: انواع اتاق‌ها
- **room_type_translations**: ترجمه‌های اتاق‌ها
- **bookings**: رزروها
- **jobs**: آگهی‌های شغلی
- **job_translations**: ترجمه‌های شغل‌ها
- **job_applications**: درخواست‌های کار
- **businesses**: کسب‌وکارها
- **business_translations**: ترجمه‌های کسب‌وکارها
- **articles**: مقالات
- **article_translations**: ترجمه‌های مقالات
- **audit_logs**: لاگ‌های امنیتی

### روابط کلیدی
- هر Hostel دارای چندین Translation و RoomType است
- هر Booking به یک User، Hostel و RoomType متصل است
- هر Job دارای چندین Translation و Application است
- تمام ترجمه‌ها از الگوی [entityId + locale] استفاده می‌کنند

## 🔒 امنیت

### پیاده‌سازی شده
- رمزگذاری رمز عبور (در تولید از bcrypt/argon2 استفاده کنید)
- اعتبارسنجی ورودی
- مدیریت session
- کنترل دسترسی مبتنی بر نقش

### توصیه‌های تولید
- استفاده از HTTPS
- تنظیم rate limiting
- پیاده‌سازی CSRF protection
- استفاده از environment variables
- فعال‌سازی security headers
- پیاده‌سازی audit logging

## 🌐 بین‌المللی‌سازی (i18n)

### ساختار ترجمه
```typescript
// src/i18n.ts
export const translations = {
  en: { 'nav.home': 'Home', ... },
  ru: { 'nav.home': 'Главная', ... },
  hy: { 'nav.home': 'Գլdelays', ... },
  fa: { 'nav.home': 'خانه', ... },
};
```

### پشتیبانی RTL
فارسی به صورت خودکار RTL می‌شود:
```typescript
document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🧪 تست

### تست‌های پیشنهادی
```bash
# Unit Tests
npm test

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e
```

## 📈 بهینه‌سازی عملکرد

### پیاده‌سازی شده
- Lazy loading برای تصاویر
- Code splitting با React Router
- Memoization با React.memo
- Debounced search

### توصیه‌های تولید
- استفاده از CDN برای assets
- پیاده‌سازی caching strategy
- بهینه‌سازی تصاویر با WebP
- استفاده از service workers
- پیاده‌سازی pagination

## 🚢 استقرار

### Docker Compose (توصیه شده)
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  backend:
    build: ./backend
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://...
  
  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=armenia_life_hub
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### محیط‌های ابری
- **Vercel**: برای frontend
- **Railway/Render**: برای backend + PostgreSQL
- **AWS/Azure**: برای استقرار enterprise

## 📝 توسعه آینده

### ویژگی‌های پیشنهادی
- [ ] سیستم پرداخت آنلاین
- [ ] چت زنده پشتیبانی
- [ ] سیستم نظرات و امتیازدهی
- [ ] اپلیکیشن موبایل (React Native)
- [ ] API عمومی برای توسعه‌دهندگان
- [ ] سیستم notification پیشرفته
- [ ] یکپارچگی با Google Maps
- [ ] سیستم توصیه‌گر هوشمند

## 🤝 مشارکت

1. Fork کنید
2. Branch ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. Commit کنید (`git commit -m 'Add AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 📞 تماس

- ایمیل: info@armenialifehub.com
- وب‌سایت: https://armenialifehub.com

---

**توجه**: این یک پروژه نمایشی است و داده‌های هاستل‌ها، مشاغل و کسب‌وکارها ساختگی هستند.
