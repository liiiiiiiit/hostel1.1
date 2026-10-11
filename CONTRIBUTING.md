# راهنمای مشارکت در Armenia Life Hub

از مشارکت شما متشکریم! 🎉

## چگونه می‌توانید مشارکت کنید

### گزارش باگ

اگر باگی پیدا کردید، لطفاً یک Issue باز کنید و شامل موارد زیر باشد:

- توضیح واضح از مشکل
- مراحل بازتولید مشکل
- رفتار مورد انتظار
- اسکرین‌شات (در صورت امکان)
- اطلاعات محیط (سیستم عامل، نسخه Node.js، نسخه مرورگر)

### پیشنهاد ویژگی

برای پیشنهاد ویژگی جدید:

1. ابتدا Issue را بررسی کنید تا مطمئن شوید ویژگی قبلاً پیشنهاد نشده
2. یک Issue جدید با برچسب `enhancement` باز کنید
3. ویژگی را به وضوح توضیح دهید
4. در صورت امکان، نمونه‌ای از استفاده ارائه دهید

### ارسال Pull Request

1. Fork کنید
2. Branch ایجاد کنید:
   ```bash
   git checkout -b feature/my-feature
   # یا
   git checkout -b fix/my-bug-fix
   ```
3. تغییرات را commit کنید:
   ```bash
   git commit -m "feat: add new feature"
   # یا
   git commit -m "fix: resolve bug issue"
   ```
4. Push کنید:
   ```bash
   git push origin feature/my-feature
   ```
5. Pull Request باز کنید

## استانداردهای کدنویسی

### TypeScript

- از TypeScript strict mode استفاده کنید
- تمام type ها را به وضوح تعریف کنید
- از `any` تا حد امکان اجتناب کنید
- نام‌گذاری متغیرها و توابع را به انگلیسی انجام دهید

### React

- از functional components استفاده کنید
- از hooks به درستی استفاده کنید
- کامپوننت‌ها را کوچک و متمرکز نگه دارید
- از prop types یا TypeScript interfaces استفاده کنید

### CSS

- از Tailwind CSS utility classes استفاده کنید
- از inline styles اجتناب کنید
- کلاس‌ها را به صورت معنادار نام‌گذاری کنید

### Commit Messages

از [Conventional Commits](https://www.conventionalcommits.org/) پیروی کنید:

- `feat`: ویژگی جدید
- `fix`: رفع باگ
- `docs`: تغییرات مستندات
- `style`: تغییرات قالب‌بندی (بدون تغییر کد)
- `refactor`: بازسازی کد
- `test`: افزودن یا تغییر تست‌ها
- `chore`: تغییرات build یا ابزارها

مثال:
```
feat: add hostel booking system
fix: resolve login validation error
docs: update README with installation steps
```

## ساختار پروژه

```
src/
├── components/     # کامپوننت‌های React
├── pages/         # صفحات برنامه
├── hooks/         # custom hooks
├── utils/         # توابع کمکی
├── types/         # تعاریف TypeScript
├── services/      # سرویس‌های API
├── store/         # مدیریت state
└── i18n/          # ترجمه‌ها
```

## تست

قبل از ارسال PR، مطمئن شوید:

```bash
# بررسی type ها
npm run typecheck

# ساخت پروژه
npm run build

# بررسی lint (در صورت وجود)
npm run lint
```

## ترجمه

اگر می‌خواهید به ترجمه کمک کنید:

1. فایل‌های ترجمه در `src/i18n/` قرار دارند
2. کلیدهای جدید را به تمام زبان‌ها اضافه کنید
3. از Google Translate یا ابزارهای مشابه استفاده نکنید
4. ترجمه‌ها را با native speaker بررسی کنید

## سوالات

اگر سوالی دارید، می‌توانید:

- Issue باز کنید
- به [Discussions](../../discussions) بپیوندید
- با maintainer تماس بگیرید

## قدردانی

تمام مشارکت‌کنندگان در فایل [CONTRIBUTORS.md](CONTRIBUTORS.md) ذکر خواهند شد.

ممنون از مشارکت شما! 🙏
