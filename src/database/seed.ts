import { db } from './schema';

// Hash function for demo (in production, use bcrypt/argon2)
async function hashPassword(password: string): Promise<string> {
  return btoa(password); // Simple demo encoding
}

export async function seedDatabase() {
  // Check if already seeded
  const userCount = await db.users.count();
  if (userCount > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding database...');

  // Seed Users
  const users = await db.users.bulkAdd([
    {
      email: 'admin@demo.example.com',
      passwordHash: await hashPassword('DemoAdmin!2026#Hub'),
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      email: 'hostel.manager@demo.example.com',
      passwordHash: await hashPassword('DemoHostel!2026#Hub'),
      name: 'Armen Hostel Manager',
      role: 'HOSTEL_MANAGER',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      email: 'employer@demo.example.com',
      passwordHash: await hashPassword('DemoEmployer!2026#Hub'),
      name: 'Tech Armenia HR',
      role: 'EMPLOYER',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
    },
    {
      email: 'jobseeker@demo.example.com',
      passwordHash: await hashPassword('DemoSeeker!2026#Hub'),
      name: 'Maria Johnson',
      role: 'JOB_SEEKER',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-10'),
    },
    {
      email: 'guest@demo.example.com',
      passwordHash: await hashPassword('DemoGuest!2026#Hub'),
      name: 'John Smith',
      role: 'GUEST',
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-04-05'),
    },
  ], { allKeys: true });

  // Seed Hostels
  const hostels = await db.hostels.bulkAdd([
    {
      slug: 'ararat-backpackers',
      city: 'Yerevan',
      address: '12 Abovyan Street, Yerevan',
      lat: 40.1834,
      lng: 44.5135,
      amenities: ['WiFi', 'Breakfast', 'Kitchen', 'Lounge', 'Laundry', '24h Reception'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      slug: 'cascade-city-stay',
      city: 'Yerevan',
      address: '5 Moskovyan Street, Yerevan',
      lat: 40.1880,
      lng: 44.5100,
      amenities: ['WiFi', 'Breakfast', 'Rooftop Terrace', 'Bar', 'Kitchen', 'Tours'],
      checkInTime: '15:00',
      checkOutTime: '10:00',
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      slug: 'lake-sevan-travelers',
      city: 'Sevan',
      address: '3 Sevan Coast Road, Sevan',
      lat: 40.5483,
      lng: 44.9514,
      amenities: ['WiFi', 'Breakfast', 'Lake View', 'BBQ Area', 'Bike Rental', 'Parking'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'Free cancellation up to 72 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
    {
      slug: 'gyumri-heritage',
      city: 'Gyumri',
      address: '8 Rustaveli Street, Gyumri',
      lat: 40.7893,
      lng: 43.8489,
      amenities: ['WiFi', 'Breakfast', 'Library', 'Art Gallery', 'Kitchen', 'Garden'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04'),
    },
    {
      slug: 'dilijan-forest-backpackers',
      city: 'Dilijan',
      address: '15 Forest Road, Dilijan',
      lat: 40.7425,
      lng: 44.8664,
      amenities: ['WiFi', 'Breakfast', 'Hiking Trails', 'Fireplace', 'Garden', 'Nature Tours'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-05'),
    },
    {
      slug: 'vanadzor-mountain-stay',
      city: 'Vanadzor',
      address: '22 Tumanyan Street, Vanadzor',
      lat: 40.8133,
      lng: 44.4961,
      amenities: ['WiFi', 'Breakfast', 'Mountain View', 'Ski Storage', 'Kitchen', 'Heating'],
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'Free cancellation up to 24 hours before check-in.',
      imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=500&fit=crop',
      published: true,
      createdAt: new Date('2024-01-06'),
      updatedAt: new Date('2024-01-06'),
    },
  ], { allKeys: true });

  // Seed Hostel Translations
  await db.hostelTranslations.bulkAdd([
    { hostelId: hostels[0], locale: 'en', name: 'Ararat Backpackers Hostel', description: 'A vibrant backpacker hostel in the heart of Yerevan, steps from Republic Square. Perfect for meeting fellow travelers and exploring Armenian culture.' },
    { hostelId: hostels[0], locale: 'ru', name: 'Хостел Арарат Бэкпэкерс', description: 'Яркий хостел в центре Еревана, в нескольких шагах от площади Республики.' },
    { hostelId: hostels[0], locale: 'hy', name: 'Արdelays Բdelays', description: 'Delays delays delays delays delays delays delays.' },
    { hostelId: hostels[0], locale: 'fa', name: 'هاستل آرارات بکپکرز', description: 'یک هاستل پر جنب و جوش در قلب ایروان.' },
    
    { hostelId: hostels[1], locale: 'en', name: 'Cascade City Stay', description: 'Modern hostel near the Cascade complex with stunning rooftop views of Mount Ararat.' },
    { hostelId: hostels[1], locale: 'ru', name: 'Каскад Сити Стей', description: 'Современный хостел рядом с комплексом Каскад.' },
    { hostelId: hostels[1], locale: 'hy', name: 'Delays Delays', description: 'Delays delays delays delays.' },
    { hostelId: hostels[1], locale: 'fa', name: 'کاسکید سیتی استی', description: 'هاستل مدرن نزدیک مجموعه کاسکید.' },
    
    { hostelId: hostels[2], locale: 'en', name: 'Lake Sevan Travelers Hostel', description: 'Beautiful lakeside hostel with panoramic views of Lake Sevan.' },
    { hostelId: hostels[2], locale: 'ru', name: 'Хостел Озеро Севан', description: 'Красивый хостел на берегу озера.' },
    { hostelId: hostels[2], locale: 'hy', name: 'Delays Delays', description: 'Delays delays delays.' },
    { hostelId: hostels[2], locale: 'fa', name: 'هاستل مسافران دریاچه سوان', description: 'هاستل زیبای کنار دریاچه.' },
    
    { hostelId: hostels[3], locale: 'en', name: 'Gyumri Heritage Hostel', description: 'Charming hostel in a restored 19th-century building in historic Gyumri.' },
    { hostelId: hostels[3], locale: 'ru', name: 'Хостел Наследие Гюмри', description: 'Очаровательный хостел в восстановленном здании XIX века.' },
    { hostelId: hostels[3], locale: 'hy', name: 'Delays Delays', description: 'Delays delays delays.' },
    { hostelId: hostels[3], locale: 'fa', name: 'هاستل میراث گیومری', description: 'هاستل دلنشین در یک ساختمان مرمت شده.' },
    
    { hostelId: hostels[4], locale: 'en', name: 'Dilijan Forest Backpackers', description: 'Nature retreat surrounded by the lush forests of Dilijan National Park.' },
    { hostelId: hostels[4], locale: 'ru', name: 'Дилижан Лес Бэкпэкерс', description: 'Природный курорт в окружении пышных лесов.' },
    { hostelId: hostels[4], locale: 'hy', name: 'Delays Delays', description: 'Delays delays delays.' },
    { hostelId: hostels[4], locale: 'fa', name: 'بکپکرز جنگل دیلیجان', description: 'اقامتگاه طبیعت محاط توسط جنگل‌ها.' },
    
    { hostelId: hostels[5], locale: 'en', name: 'Vanadzor Mountain Stay', description: 'Warm and welcoming hostel in Vanadzor with stunning mountain views.' },
    { hostelId: hostels[5], locale: 'ru', name: 'Ванадзор Маунтин سтей', description: 'Тёплый и гостеприимный хостел в Ванадзоре.' },
    { hostelId: hostels[5], locale: 'hy', name: 'Delays Delays', description: 'Delays delays delays.' },
    { hostelId: hostels[5], locale: 'fa', name: 'وانادزور ماونتین استی', description: 'هاستل گرم و صمیمی در وانادزور.' },
  ]);

  // Seed Room Types
  const roomTypes = await db.roomTypes.bulkAdd([
    { hostelId: hostels[0], type: 'dorm', beds: 8, pricePerNight: 8000 },
    { hostelId: hostels[0], type: 'dorm', beds: 4, pricePerNight: 12000 },
    { hostelId: hostels[0], type: 'private', beds: 2, pricePerNight: 22000 },
    { hostelId: hostels[1], type: 'dorm', beds: 6, pricePerNight: 9000 },
    { hostelId: hostels[1], type: 'dorm', beds: 10, pricePerNight: 6500 },
    { hostelId: hostels[1], type: 'private', beds: 1, pricePerNight: 28000 },
    { hostelId: hostels[2], type: 'dorm', beds: 6, pricePerNight: 7000 },
    { hostelId: hostels[2], type: 'private', beds: 2, pricePerNight: 18000 },
    { hostelId: hostels[2], type: 'private', beds: 4, pricePerNight: 32000 },
    { hostelId: hostels[3], type: 'dorm', beds: 4, pricePerNight: 7500 },
    { hostelId: hostels[3], type: 'private', beds: 2, pricePerNight: 16000 },
    { hostelId: hostels[3], type: 'private', beds: 1, pricePerNight: 14000 },
    { hostelId: hostels[4], type: 'dorm', beds: 8, pricePerNight: 6000 },
    { hostelId: hostels[4], type: 'private', beds: 2, pricePerNight: 20000 },
    { hostelId: hostels[4], type: 'private', beds: 6, pricePerNight: 45000 },
    { hostelId: hostels[5], type: 'dorm', beds: 6, pricePerNight: 5500 },
    { hostelId: hostels[5], type: 'dorm', beds: 4, pricePerNight: 8000 },
    { hostelId: hostels[5], type: 'private', beds: 2, pricePerNight: 17000 },
  ], { allKeys: true });

  // Seed Room Type Translations
  await db.roomTypeTranslations.bulkAdd([
    { roomTypeId: roomTypes[0], locale: 'en', name: '8-Bed Mixed Dorm', description: 'Comfortable bunk beds in a shared dormitory' },
    { roomTypeId: roomTypes[0], locale: 'ru', name: '8-местный общий номер', description: 'Удобные двухъярусные кровати' },
    { roomTypeId: roomTypes[0], locale: 'hy', name: 'Delays', description: 'Delays' },
    { roomTypeId: roomTypes[0], locale: 'fa', name: 'خوابگاه ۸ تخت', description: 'تخت‌های راحت' },
    
    { roomTypeId: roomTypes[1], locale: 'en', name: '4-Bed Female Dorm', description: 'Private female-only dormitory' },
    { roomTypeId: roomTypes[1], locale: 'ru', name: '4-местный женский номер', description: 'Женский общий номер' },
    { roomTypeId: roomTypes[1], locale: 'hy', name: 'Delays', description: 'Delays' },
    { roomTypeId: roomTypes[1], locale: 'fa', name: 'خوابگاه ۴ تخت زنانه', description: 'خوابگاه مخصوص بانوان' },
    
    { roomTypeId: roomTypes[2], locale: 'en', name: 'Private Double Room', description: 'Cozy private room with ensuite bathroom' },
    { roomTypeId: roomTypes[2], locale: 'ru', name: 'Приватный двухместный номер', description: 'Уютный приватный номер' },
    { roomTypeId: roomTypes[2], locale: 'hy', name: 'Delays', description: 'Delays' },
    { roomTypeId: roomTypes[2], locale: 'fa', name: 'اتاق دوبل خصوصی', description: 'اتاق خصوصی دنج' },
  ]);

  console.log('Database seeded successfully!');
}
