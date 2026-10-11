# Armenia Life Hub 🇦🇲

یک پلتفرم جامع چندزبانه برای کمک به گردشگران، دانشجویان بین‌المللی، ساکنان خارجی و جویندگان کار در ارمنستان.

![Armenia Life Hub](https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&h=400&fit=crop)

## 🌟 ویژگی‌ها

### ماژول‌های اصلی

- **🏨 سیستم رزرو هاستل**: ۶ هاستل نمونه با مدیریت موجودی و جلوگیری از رزرو تکراری
- **💼 پلتفرم استخدام**: ۱۲ آگهی شغلی با سیستم درخواست کار
- **🏪 دایرکتوری خدمات محلی**: ۲۵ کسب‌وکار در دسته‌بندی‌های مختلف
- **📚 راهنمای ارمنستان**: ۲۰ مقاله آموزشی در موضوعات مختلف

### ویژگی‌های فنی

- ✅ **زبان فارسی کامل** با پشتیبانی RTL
- ✅ **طراحی واکنش‌گرا** (Responsive) برای موبایل و دسکتاپ
- ✅ **سیستم احراز هویت** با نقش‌های کاربری مختلف
- ✅ **پنل کاربری** برای مدیریت رزروها و درخواست‌ها
- ✅ **پنل مدیریت** برای نظارت بر کل سیستم
- ✅ **جستجو و فیلتر** پیشرفته در تمام بخش‌ها
- ✅ **ذخیره‌سازی محلی** با localStorage

## 🚀 شروع سریع

### پیش‌نیازها

- Node.js نسخه 18 یا بالاتر
- npm یا yarn

### نصب

```bash
# کلون کردن مخزن
git clone https://github.com/your-username/armenia-life-hub.git

# ورود به پوشه پروژه
cd armenia-life-hub

# نصب وابستگی‌ها
npm install
```

### اجرا در حالت توسعه

```bash
npm run dev
```

سپس مرورگر خود را باز کنید و به آدرس `http://localhost:5173` بروید.

### ساخت برای تولید

```bash
npm run build
```

فایل‌های ساخته شده در پوشه `dist` قرار می‌گیرند.

### پیش‌نمایش ساخت تولید

```bash
npm run preview
```

## 🔐 حساب‌های آزمایشی

| نقش | ایمیل | رمز عبور |
|-----|--------|----------|
| مدیر کل | admin@demo.example.com | DemoAdmin!2026#Hub |
| مدیر هاستل | hostel.manager@demo.example.com | DemoHostel!2026#Hub |
| کارفرما | employer@demo.example.com | DemoEmployer!2026#Hub |
| جوینده کار | jobseeker@demo.example.com | DemoSeeker!2026#Hub |
| مهمان | guest@demo.example.com | DemoGuest!2026#Hub |

## 📁 ساختار پروژه

```
armenia-life-hub/
├── src/
│   ├── App.tsx              # کامپوننت اصلی برنامه
│   ├── main.tsx             # نقطه ورود برنامه
│   ├── index.css            # استایل‌های عمومی
│   ├── types.ts             # تعاریف TypeScript
│   ├── context.tsx          # مدیریت state برنامه
│   ├── i18n.ts              # ترجمه‌های فارسی
│   ├── store.ts             # مدیریت داده‌ها
│   ├── data/
│   │   ├── constants.ts     # ثابت‌ها و داده‌های اولیه
│   │   ├── hostels.ts       # داده‌های هاستل‌ها
│   │   ├── jobs.ts          # داده‌های مشاغل
│   │   └── content.ts       # داده‌های خدمات و مقالات
│   ├── database/
│   │   ├── schema.ts        # ساختار پایگاه داده
│   │   └── seed.ts          # داده‌های نمونه
│   ├── services/
│   │   ├── auth.service.ts  # سرویس احراز هویت
│   │   ├── hostel.service.ts # سرویس هاستل
│   │   ├── job.service.ts   # سرویس مشاغل
│   │   └── content.service.ts # سرویس محتوا
│   └── api/
│       └── index.ts         # لایه API
├── prisma/
│   └── schema.prisma        # ساختار PostgreSQL
├── backend/
│   └── server.ts            # نمونه سرور Express.js
├── public/                  # فایل‌های عمومی
├── dist/                    # فایل‌های ساخته شده
├── index.html               # فایل HTML اصلی
├── package.json             # وابستگی‌ها و اسکریپت‌ها
├── tsconfig.json            # تنظیمات TypeScript
├── vite.config.js           # تنظیمات Vite
├── tailwind.config.js       # تنظیمات Tailwind CSS
├── .gitignore              # فایل‌های نادیده Git
├── LICENSE                 # مجوز پروژه
└── README.md               # این فایل
```

## 🛠️ فناوری‌های استفاده شده

### Frontend
- **React 18** - کتابخانه UI
- **TypeScript** - زبان برنامه‌نویسی
- **Vite** - ابزار ساخت
- **Tailwind CSS** - فریمورک CSS
- **React Router** - مسیریابی
- **Lucide React** - آیکون‌ها

### Backend (ساختار آماده)
- **Node.js** - محیط اجرا
- **Express.js** - فریمورک وب
- **PostgreSQL** - پایگاه داده
- **Prisma ORM** - مدیریت پایگاه داده
- **IndexedDB (Dexie.js)** - پایگاه داده محلی

## 🌐 مهاجرت به PostgreSQL

برای استفاده از پایگاه داده واقعی PostgreSQL:

### ۱. نصب Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

### ۲. تنظیم DATABASE_URL

فایل `.env` را ایجاد کنید:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/armenia_life_hub?schema=public"
```

### ۳. اجرای Migration

```bash
npx prisma migrate dev --name init
```

### ۴. تغییر Service Layer

فایل‌های `src/services/*.ts` را تغییر دهید تا از Prisma Client استفاده کنند:

```typescript
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

### ۵. ایجاد سرور Express.js

از فایل `backend/server.ts` به عنوان نمونه استفاده کنید.

## 📊 ساختار پایگاه داده

### جداول اصلی

- **users**: اطلاعات کاربران و نقش‌ها
- **hostels**: اطلاعات هاستل‌ها
- **hostel_translations**: ترجمه‌های هاستل
- **room_types**: انواع اتاق‌ها
- **bookings**: رزروها
- **jobs**: آگهی‌های شغلی
- **job_translations**: ترجمه‌های شغل‌ها
- **job_applications**: درخواست‌های کار
- **businesses**: کسب‌وکارها
- **business_translations**: ترجمه‌های کسب‌وکارها
- **articles**: مقالات
- **article_translations**: ترجمه‌های مقالات

## 🔒 امنیت

### پیاده‌سازی شده

- ✅ رمزگذاری رمز عبور
- ✅ اعتبارسنجی ورودی
- ✅ مدیریت session
- ✅ کنترل دسترسی مبتنی بر نقش

### توصیه‌های تولید

- استفاده از HTTPS
- تنظیم rate limiting
- پیاده‌سازی CSRF protection
- استفاده از environment variables
- فعال‌سازی security headers

## 🚢 استقرار

### Docker Compose

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: armenia_life_hub
      POSTGRES_USER: armenia_user
      POSTGRES_PASSWORD: armenia_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_/var/lib/postgresql/data

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://armenia_user:armenia_password@postgres:5432/armenia_life_hub
    ports:
      - "4000:4000"
    depends_on:
      - postgres

  frontend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

### پلتفرم‌های ابری

- **Vercel**: برای frontend
- **Railway/Render**: برای backend + PostgreSQL
- **AWS/Azure**: برای استقرار enterprise

## 📝 اسکریپت‌ها

```bash
# اجرا در حالت توسعه
npm run dev

# ساخت برای تولید
npm run build

# پیش‌نمایش ساخت تولید
npm run preview

# بررسی نوع‌ها
npm run typecheck
```

## 🤝 مشارکت

مشارکت شما welcome است! لطفاً:

1. Fork کنید
2. Branch ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. Commit کنید (`git commit -m 'Add AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است - برای جزئیات فایل [LICENSE](LICENSE) را ببینید.

## 📞 تماس

- ایمیل: info@armenialifehub.com
- وب‌سایت: https://armenialifehub.com

## 🙏 تقدیر

- طراحی UI/UX الهام گرفته از پلتفرم‌های مدرن سفر و استخدام
- آیکون‌ها از [Lucide](https://lucide.dev)
- فونت‌ها از [Google Fonts](https://fonts.google.com)

---

**توجه**: این یک پروژه نمایشی است و داده‌های هاستل‌ها، مشاغل و کسب‌وکارها ساختگی هستند.

ساخته شده با ❤️ برای جامعه ارمنستان
