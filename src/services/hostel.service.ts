import { db, HostelDB, HostelTranslationDB, RoomTypeDB, RoomTypeTranslationDB, BookingDB } from '../database/schema';

export interface HostelWithTranslations extends HostelDB {
  id: number;
  translations: Record<string, { name: string; description: string }>;
  rooms: (RoomTypeDB & { id: number; translations: Record<string, { name: string; description: string }> })[];
}

export const HostelService = {
  async getAll(publishedOnly = true): Promise<HostelWithTranslations[]> {
    let hostels = await db.hostels.toArray();
    if (publishedOnly) {
      hostels = hostels.filter(h => h.published);
    }

    const result: HostelWithTranslations[] = [];

    for (const hostel of hostels) {
      const translations = await db.hostelTranslations.where('hostelId').equals(hostel.id!).toArray();
      const rooms = await db.roomTypes.where('hostelId').equals(hostel.id!).toArray();

      const translationMap: Record<string, { name: string; description: string }> = {};
      for (const t of translations) {
        translationMap[t.locale] = { name: t.name, description: t.description };
      }

      const roomsWithTranslations = [];
      for (const room of rooms) {
        const roomTranslations = await db.roomTypeTranslations.where('roomTypeId').equals(room.id!).toArray();
        const roomTranslationMap: Record<string, { name: string; description: string }> = {};
        for (const rt of roomTranslations) {
          roomTranslationMap[rt.locale] = { name: rt.name, description: rt.description };
        }
        roomsWithTranslations.push({ ...room, id: room.id!, translations: roomTranslationMap });
      }

      result.push({
        ...hostel,
        id: hostel.id!,
        translations: translationMap,
        rooms: roomsWithTranslations,
      });
    }

    return result;
  },

  async getBySlug(slug: string): Promise<HostelWithTranslations | null> {
    const hostel = await db.hostels.where('slug').equals(slug).first();
    if (!hostel) return null;

    const translations = await db.hostelTranslations.where('hostelId').equals(hostel.id!).toArray();
    const rooms = await db.roomTypes.where('hostelId').equals(hostel.id!).toArray();

    const translationMap: Record<string, { name: string; description: string }> = {};
    for (const t of translations) {
      translationMap[t.locale] = { name: t.name, description: t.description };
    }

    const roomsWithTranslations = [];
    for (const room of rooms) {
      const roomTranslations = await db.roomTypeTranslations.where('roomTypeId').equals(room.id!).toArray();
      const roomTranslationMap: Record<string, { name: string; description: string }> = {};
      for (const rt of roomTranslations) {
        roomTranslationMap[rt.locale] = { name: rt.name, description: rt.description };
      }
      roomsWithTranslations.push({ ...room, id: room.id!, translations: roomTranslationMap });
    }

    return {
      ...hostel,
      id: hostel.id!,
      translations: translationMap,
      rooms: roomsWithTranslations,
    };
  },

  async getById(id: number): Promise<HostelWithTranslations | null> {
    const hostel = await db.hostels.get(id);
    if (!hostel) return null;

    const translations = await db.hostelTranslations.where('hostelId').equals(id).toArray();
    const rooms = await db.roomTypes.where('hostelId').equals(id).toArray();

    const translationMap: Record<string, { name: string; description: string }> = {};
    for (const t of translations) {
      translationMap[t.locale] = { name: t.name, description: t.description };
    }

    const roomsWithTranslations = [];
    for (const room of rooms) {
      const roomTranslations = await db.roomTypeTranslations.where('roomTypeId').equals(room.id!).toArray();
      const roomTranslationMap: Record<string, { name: string; description: string }> = {};
      for (const rt of roomTranslations) {
        roomTranslationMap[rt.locale] = { name: rt.name, description: rt.description };
      }
      roomsWithTranslations.push({ ...room, id: room.id!, translations: roomTranslationMap });
    }

    return {
      ...hostel,
      id: hostel.id!,
      translations: translationMap,
      rooms: roomsWithTranslations,
    };
  },

  async count(): Promise<number> {
    return await db.hostels.count();
  },
};

export const BookingService = {
  async create(booking: Omit<BookingDB, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<BookingDB> {
    const now = new Date();
    const id = await db.bookings.add({
      ...booking,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    });
    const created = await db.bookings.get(id);
    return created!;
  },

  async updateStatus(id: number, status: BookingDB['status']): Promise<void> {
    await db.bookings.update(id, { status, updatedAt: new Date() });
  },

  async getAll(): Promise<BookingDB[]> {
    return await db.bookings.toArray();
  },

  async getByUserId(userId: number): Promise<BookingDB[]> {
    return await db.bookings.where('userId').equals(userId).toArray();
  },

  async getByHostelId(hostelId: number): Promise<BookingDB[]> {
    return await db.bookings.where('hostelId').equals(hostelId).toArray();
  },

  async getById(id: number): Promise<BookingDB | undefined> {
    return await db.bookings.get(id);
  },

  async countByStatus(status: BookingDB['status']): Promise<number> {
    return await db.bookings.where('status').equals(status).count();
  },

  // Check availability (prevents double booking)
  async checkAvailability(hostelId: number, roomTypeId: number, checkIn: string, checkOut: string): Promise<boolean> {
    const room = await db.roomTypes.get(roomTypeId);
    if (!room) return false;

    const existingBookings = await db.bookings
      .where('hostelId')
      .equals(hostelId)
      .filter(b => 
        b.roomTypeId === roomTypeId && 
        b.status !== 'CANCELLED' && 
        b.status !== 'REJECTED' &&
        b.checkIn < checkOut && 
        b.checkOut > checkIn
      )
      .toArray();

    return existingBookings.length < room.beds;
  },
};
