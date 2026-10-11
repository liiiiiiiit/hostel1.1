# راهنمای آپلود در GitHub

## مراحل آپلود پروژه

### 1. ایجاد مخزن GitHub

1. به [GitHub](https://github.com) بروید
2. روی دکمه **New** کلیک کنید
3. اطلاعات زیر را پر کنید:
   - **Repository name**: `armenia-life-hub`
   - **Description**: `پلتفرم جامع برای زندگی در ارمنستان - هاستل، شغل، خدمات و راهنما`
   - **Public** را انتخاب کنید
   - تیک **Add a README file** را **نزنید** (ما قبلاً داریم)
4. روی **Create repository** کلیک کنید

### 2. اتصال مخزن محلی به GitHub

در ترمینال، دستورات زیر را اجرا کنید:

```bash
# مقداردهی اولیه Git (اگر قبلاً انجام نشده)
git init

# افزودن تمام فایل‌ها
git add .

# اولین commit
git commit -m "feat: initial release of Armenia Life Hub"

# تغییر نام branch به main
git branch -M main

# اضافه کردن remote
git remote add origin https://github.com/YOUR-USERNAME/armenia-life-hub.git

# ارسال به GitHub
git push -u origin main
```

**توجه**: `YOUR-USERNAME` را با نام کاربری GitHub خود جایگزین کنید.

### 3. بررسی مخزن

1. به صفحه مخزن خود در GitHub بروید
2. مطمئن شوید تمام فایل‌ها آپلود شده‌اند
3. README.md را در صفحه اصلی بررسی کنید

## فایل‌های موجود در پروژه

### مستندات
- ✅ `README.md` - راهنمای اصلی پروژه
- ✅ `LICENSE` - مجوز MIT
- ✅ `CONTRIBUTING.md` - راهنمای مشارکت
- ✅ `CHANGELOG.md` - تاریخچه تغییرات
- ✅ `CONTRIBUTORS.md` - لیست مشارکت‌کنندگان
- ✅ `CODE_OF_CONDUCT.md` - منشور رفتار
- ✅ `SECURITY.md` - سیاست امنیت
- ✅ `.gitignore` - فایل‌های نادیده Git
- ✅ `.env.example` - نمونه متغیرهای محیطی

### کد منبع
- ✅ `src/` - کد منبع React
- ✅ `src/App.tsx` - کامپوننت اصلی
- ✅ `src/data/` - داده‌های نمونه
- ✅ `src/services/` - سرویس‌های backend
- ✅ `src/database/` - ساختار پایگاه داده
- ✅ `prisma/` - schema برای PostgreSQL
- ✅ `backend/` - نمونه سرور Express.js

### تنظیمات
- ✅ `package.json` - وابستگی‌ها
- ✅ `tsconfig.json` - تنظیمات TypeScript
- ✅ `vite.config.js` - تنظیمات Vite
- ✅ `index.html` - فایل HTML اصلی

## دستورات مفید Git

### مشاهده وضعیت
```bash
git status
```

### افزودن تغییرات
```bash
git add .
# یا فایل خاص
git add README.md
```

### Commit کردن
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update README"
```

### ارسال به GitHub
```bash
git push
```

### دریافت تغییرات از GitHub
```bash
git pull
```

### ایجاد branch جدید
```bash
git checkout -b feature/new-feature
```

## برچسب‌گذاری نسخه (Tagging)

برای انتشار نسخه جدید:

```bash
# ایجاد tag
git tag -a v1.0.0 -m "Version 1.0.0 - Initial Release"

# ارسال tag
git push origin v1.0.0
```

## افزودن موضوعات (Topics)

در صفحه مخزن GitHub:

1. روی **About** کلیک کنید
2. روی ⚙️ کلیک کنید
3. موضوعات زیر را اضافه کنید:
   - `react`
   - `typescript`
   - `tailwindcss`
   - `armenia`
   - `hostel-booking`
   - `job-platform`
   - `persian`
   - `rtl`
   - `fullstack`

## افزودن توضیحات و لینک‌ها

در بخش **About**:

- **Description**: پلتفرم جامع برای زندگی در ارمنستان
- **Website**: https://armenialifehub.com (در صورت وجود)
- **Topics**: همانطور که در بالا ذکر شد

## محافظت از Branch

برای محافظت از branch اصلی:

1. به **Settings** > **Branches** بروید
2. روی **Add rule** کلیک کنید
3. تنظیمات:
   - **Branch name pattern**: `main`
   - تیک **Require pull request reviews before merging**
   - تیک **Require status checks to pass before merging**

## افزودن GitHub Actions (اختیاری)

فایل `.github/workflows/ci.yml` را ایجاد کنید:

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Type check
      run: npm run typecheck
    
    - name: Build
      run: npm run build
```

## بررسی نهایی

قبل از اشتراک‌گذاری:

- [ ] تمام فایل‌ها آپلود شده‌اند
- [ ] README.md به درستی نمایش داده می‌شود
- [ ] لینک‌ها کار می‌کنند
- [ ] تصاویر بارگذاری می‌شوند
- [ ] موضوعات اضافه شده‌اند
- [ ] مجوز انتخاب شده است
- [ ] Branch protection فعال است

## اشتراک‌گذاری

حالا می‌توانید:

1. لینک مخزن را به اشتراک بگذارید
2. در شبکه‌های اجتماعی اعلام کنید
3. در community های مربوطه معرفی کنید
4. از دوستان بخواهید star بزنند

## پشتیبانی

اگر مشکلی داشتید:

- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

---

موفق باشید! 🚀
