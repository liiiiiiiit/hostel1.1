import { Job } from '../types';

export const JOBS: Job[] = [
  {
    id: 'j1', companyId: 'c1', companyName: 'Grand Hotel Yerevan', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 300000, salaryMax: 450000, currency: 'AMD',
    deadline: '2026-03-30', languages: ['English', 'Russian'], published: true, createdAt: '2026-01-15',
    translations: {
      en: { title: 'Hotel Receptionist', description: 'We are looking for a friendly and professional hotel receptionist to join our front desk team. Handle check-ins, guest inquiries, and reservations.', requirements: 'Fluent English and Russian. Previous hotel experience preferred. Excellent communication skills.' },
      ru: { title: 'Администратор отеля', description: 'Ищем дружелюбного и профессионального администратора для работы на ресепшене. Приём гостей, обработка бронирований.', requirements: 'Свободный английский и русский. Опыт работы в отеле предпочтителен.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays.' },
      fa: { title: 'مسئول پذیرش هتل', description: 'به دنبال یک مسئول پذیرش دوستانه و حرفه‌ای برای تیم پذیرش هستیم. رسیدگی به ورود مهمانان و رزروها.', requirements: 'انگلیسی و روسی روان. تجربه قبلی در هتل ترجیح داده می‌شود.' },
    },
  },
  {
    id: 'j2', companyId: 'c2', companyName: 'Armenia Hostel Network', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 250000, salaryMax: 350000, currency: 'AMD',
    deadline: '2026-04-15', languages: ['English'], published: true, createdAt: '2026-01-20',
    translations: {
      en: { title: 'Hostel Administrator', description: 'Manage daily operations of a busy hostel including guest relations, bookings, and staff coordination.', requirements: 'Excellent organizational skills. Fluent English. Experience in hospitality or administration.' },
      ru: { title: 'Администратор хостела', description: 'Управление ежедневными операциями хостела: работа с гостями, бронирования, координация персонала.', requirements: 'Отличные организаторские навыки. Свободный английский. Опыт в гостеприимстве.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays.' },
      fa: { title: 'مدیر هاستل', description: 'مدیریت عملیات روزانه هاستل شامل ارتباط با مهمانان، رزروها و هماهنگی کارکنان.', requirements: 'مهارت‌های سازمانی عالی. انگلیسی روان. تجربه در مهمان‌نوازی.' },
    },
  },
  {
    id: 'j3', companyId: 'c3', companyName: 'Armenia Gaming Studio', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 400000, salaryMax: 600000, currency: 'AMD',
    deadline: '2026-03-20', languages: ['English'], published: true, createdAt: '2026-01-10',
    translations: {
      en: { title: 'English-Speaking Game Presenter', description: 'Entertain and engage online audiences as a live game show presenter. Energetic personality required.', requirements: 'Native or fluent English. On-camera experience. Charismatic personality. Flexible schedule.' },
      ru: { title: 'Ведущий игрового шоу', description: 'Развлекайте онлайн-аудиторию как ведущий игрового шоу. Требуется энергичная личность.', requirements: 'С in the original text, this was cut off. Native or fluent English. Опыт работы перед камерой.' },
      hy: { title: 'Delays delays delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays.' },
      fa: { title: 'مجری بازی انگلیسی‌زبان', description: 'سرگرم کردن و مشارکت مخاطبان آنلاین به عنوان مجری زنده بازی. نیاز به شخصیت پرانرژی.', requirements: 'انگلیسی بومی یا روان. تجربه جلوی دوربین. شخصیت کاریزماتیک.' },
    },
  },
  {
    id: 'j4', companyId: 'c4', companyName: 'TechSupport Armenia', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 280000, salaryMax: 400000, currency: 'AMD',
    deadline: '2026-04-01', languages: ['English', 'Russian'], published: true, createdAt: '2026-02-01',
    translations: {
      en: { title: 'Customer Support Specialist', description: 'Provide excellent customer support via chat, email, and phone. Resolve technical issues and ensure customer satisfaction.', requirements: 'Fluent English. Problem-solving skills. Experience with CRM systems. Patient and empathetic.' },
      ru: { title: 'Специалист поддержки клиентов', description: 'Обеспечение поддержки клиентов через чат, email и телефон. Решение технических вопросов.', requirements: 'Свободный английский. Навыки решения проблем. Опыт с CRM.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays.' },
      fa: { title: 'متخصص پشتیبانی مشتری', description: 'ارائه پشتیبانی عالی از مشتریان از طریق چت، ایمیل و تلفن. حل مشکلات فنی.', requirements: 'انگلیسی روان. مهارت حل مسئله. تجربه با سیستم‌های CRM.' },
    },
  },
  {
    id: 'j5', companyId: 'c5', companyName: 'WebDev Solutions', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 500000, salaryMax: 800000, currency: 'AMD',
    deadline: '2026-04-30', languages: ['English'], published: true, createdAt: '2026-02-05',
    translations: {
      en: { title: 'Junior Web Developer', description: 'Join our development team building modern web applications. Work with React, Node.js, and PostgreSQL.', requirements: 'Basic knowledge of HTML, CSS, JavaScript. Familiarity with React or similar frameworks. Eagerness to learn.' },
      ru: { title: 'Junior веб-разработчик', description: 'Присоединяйтесь к команде разработки современных веб-приложений. Работа с React, Node.js, PostgreSQL.', requirements: 'Базовые знания HTML, CSS, JavaScript. Знакомство с React. Желание учиться.' },
      hy: { title: 'Delays delays delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays.' },
      fa: { title: 'توسعه‌دهنده وب جونیور', description: 'به تیم توسعه ما برای ساخت برنامه‌های وب مدرن بپیوندید. کار با React، Node.js و PostgreSQL.', requirements: 'دانش پایه HTML، CSS، JavaScript. آشنایی با React. اشتیاق به یادگیری.' },
    },
  },
  {
    id: 'j6', companyId: 'c6', companyName: 'Creative Armenia Agency', city: 'Yerevan',
    employmentType: 'contract', salaryMin: 350000, salaryMax: 500000, currency: 'AMD',
    deadline: '2026-03-25', languages: ['English'], published: true, createdAt: '2026-02-10',
    translations: {
      en: { title: 'Graphic Designer', description: 'Create visual content for digital and print media. Design logos, marketing materials, and social media graphics.', requirements: 'Proficiency in Adobe Creative Suite. Strong portfolio. Understanding of branding and visual communication.' },
      ru: { title: 'Графический дизайнер', description: 'Создание визуального контента для цифровых и печатных СМИ. Дизайн логотипов, маркетинговых материалов.', requirements: 'Владение Adobe Creative Suite. Сильное портфолио. Понимание брендинга.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays.' },
      fa: { title: 'طراح گرافیک', description: 'ایجاد محتوای بصری برای رسانه‌های دیجیتال و چاپی. طراحی لوگو، مواد بازاریابی و گرافیک شبکه‌های اجتماعی.', requirements: 'تسلط بر Adobe Creative Suite. نمونه کار قوی. درک برندینگ.' },
    },
  },
  {
    id: 'j7', companyId: 'c7', companyName: 'Armenian Kitchen Restaurant', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 200000, salaryMax: 300000, currency: 'AMD',
    deadline: '2026-04-10', languages: ['English', 'Armenian'], published: true, createdAt: '2026-02-15',
    translations: {
      en: { title: 'Restaurant Waiter', description: 'Provide excellent dining service to our guests. Take orders, serve food and beverages, and ensure a pleasant experience.', requirements: 'Friendly demeanor. Basic English. Ability to work in a fast-paced environment. Previous serving experience preferred.' },
      ru: { title: 'Официант ресторана', description: 'Обслуживание гостей ресторана. Приём заказов, подача блюд и напитков.', requirements: 'Дружелюбие. Базовый английский. Опыт работы официантом предпочтителен.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays.' },
      fa: { title: 'گارسون رستوران', description: 'ارائه خدمات عالی غذاخوری به مهمانان. گرفتن سفارش، سرو غذا و نوشیدنی.', requirements: 'رفتار دوستانه. انگلیسی پایه. توانایی کار در محیط پرشتاب.' },
    },
  },
  {
    id: 'j8', companyId: 'c8', companyName: 'Café Culture Yerevan', city: 'Yerevan',
    employmentType: 'part-time', salaryMin: 150000, salaryMax: 220000, currency: 'AMD',
    deadline: '2026-04-20', languages: ['English'], published: true, createdAt: '2026-02-20',
    translations: {
      en: { title: 'Barista', description: 'Prepare and serve specialty coffee drinks. Create latte art and maintain a welcoming café atmosphere.', requirements: 'Coffee preparation skills. Customer service orientation. Available for morning and afternoon shifts.' },
      ru: { title: 'Бариста', description: 'Приготовление и подача фирменных кофейных напитков. Создание латте-арт.', requirements: 'Навыки приготовления кофе. Ориентация на обслуживание клиентов.' },
      hy: { title: 'Delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays.' },
      fa: { title: 'باریستا', description: 'آماده‌سازی و سرو نوشیدنی‌های قهوه تخصصی. ایجاد لاته آرت و حفظ فضای دلپذیر کافه.', requirements: 'مهارت تهیه قهوه. گرایش به خدمات مشتری. موجود برای شیفت صبح و عصر.' },
    },
  },
  {
    id: 'j9', companyId: 'c9', companyName: 'Armenia Tours International', city: 'Yerevan',
    employmentType: 'contract', salaryMin: 300000, salaryMax: 500000, currency: 'AMD',
    deadline: '2026-05-01', languages: ['English', 'Russian'], published: true, createdAt: '2026-02-25',
    translations: {
      en: { title: 'Tourism Guide', description: 'Lead tourists through historical sites, cities, and natural attractions of Armenia. Provide engaging commentary and cultural context.', requirements: 'Excellent English. Knowledge of Armenian history and culture. First aid certification preferred. Valid driver license.' },
      ru: { title: 'Гид-экскурсовод', description: 'Ведение туристов по историческим местам, городам и природным достопримечательностям Армении.', requirements: 'Отличный английский. Знание истории и культуры Армении. Сертификат первой помощи.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays delays.' },
      fa: { title: 'راهنمای گردشگری', description: 'هدایت گردشگران از مکان‌های تاریخی، شهرها و جاذبه‌های طبیعی ارمنستان. ارائه توضیحات جذاب.', requirements: 'انگلیسی عالی. دانش تاریخ و فرهنگ ارمنستان. گواهینامه کمک‌های اولیه.' },
    },
  },
  {
    id: 'j10', companyId: 'c10', companyName: 'Business Center Armenia', city: 'Yerevan',
    employmentType: 'full-time', salaryMin: 220000, salaryMax: 320000, currency: 'AMD',
    deadline: '2026-04-15', languages: ['English', 'Russian'], published: true, createdAt: '2026-03-01',
    translations: {
      en: { title: 'Office Assistant', description: 'Support daily office operations including filing, scheduling, correspondence, and visitor management.', requirements: 'Organized and detail-oriented. Proficient in Microsoft Office. Good communication skills in English and Russian.' },
      ru: { title: 'Офис-менеджер', description: 'Поддержка ежедневных офисных операций: документооборот, планирование, переписка.', requirements: 'Организованность. Владение Microsoft Office. Хорошие коммуникативные навыки.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays.' },
      fa: { title: 'دستیار اداری', description: 'پشتیبانی از عملیات روزانه دفتر شامل بایگانی، زمان‌بندی، مکاتبات و مدیریت بازدیدکنندگان.', requirements: 'منظم و دقیق. مسلط به Microsoft Office. مهارت ارتباطی خوب.' },
    },
  },
  {
    id: 'j11', companyId: 'c11', companyName: 'Armenia Trade Co.', city: 'Gyumri',
    employmentType: 'full-time', salaryMin: 280000, salaryMax: 450000, currency: 'AMD',
    deadline: '2026-04-30', languages: ['English', 'Russian'], published: true, createdAt: '2026-03-05',
    translations: {
      en: { title: 'Sales Representative', description: 'Drive sales growth by building client relationships, presenting products, and closing deals in the northern region.', requirements: 'Strong sales skills. Valid driver license. Willingness to travel. Experience in B2B sales preferred.' },
      ru: { title: 'Торговый представитель', description: 'Развитие продаж через построение клиентских отношений, презентацию продуктов и заключение сделок.', requirements: 'Сильные навыки продаж. Водительские права. Готовность к командировкам.' },
      hy: { title: 'Delays delays', description: 'Delays delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays delays.' },
      fa: { title: 'نماینده فروش', description: 'افزایش فروش از طریق ایجاد روابط مشتری، ارائه محصولات و بستن معاملات در منطقه شمالی.', requirements: 'مهارت فروش قوی. گواهینامه رانندگی. تمایل به سفر.' },
    },
  },
  {
    id: 'j12', companyId: 'c12', companyName: 'Digital Armenia Media', city: 'Yerevan',
    employmentType: 'part-time', salaryMin: 180000, salaryMax: 280000, currency: 'AMD',
    deadline: '2026-05-15', languages: ['English'], published: true, createdAt: '2026-03-10',
    translations: {
      en: { title: 'Social Media Assistant', description: 'Manage social media accounts, create engaging content, and grow our online community across platforms.', requirements: 'Knowledge of social media platforms. Content creation skills. Basic graphic design. Creative mindset.' },
      ru: { title: 'Ассистент по соцсетям', description: 'Управление аккаунтами в социальных сетях, создание контента, развитие онлайн-сообщества.', requirements: 'Знание социальных сетей. Навыки создания контента. Базовый графический дизайн.' },
      hy: { title: 'Delays delays delays', description: 'Delays delays delays delays delays delays delays delays delays.', requirements: 'Delays delays delays delays delays delays delays.' },
      fa: { title: 'دستیار شبکه‌های اجتماعی', description: 'مدیریت حساب‌های شبکه‌های اجتماعی، ایجاد محتوای جذاب و رشد جامعه آنلاین.', requirements: 'آشنایی با پلتفرم‌های اجتماعی. مهارت تولید محتوا. طراحی گرافیک پایه.' },
    },
  },
];
