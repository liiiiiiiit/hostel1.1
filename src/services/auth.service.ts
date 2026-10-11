import { db, UserDB } from '../database/schema';

// Auth Service - Mirrors Node.js backend auth service
export const AuthService = {
  async login(email: string, password: string): Promise<UserDB | null> {
    const user = await db.users.where('email').equals(email).first();
    if (!user) return null;
    
    // Simple password check (in production use bcrypt/argon2)
    const storedHash = user.passwordHash;
    const inputHash = btoa(password);
    
    if (storedHash === inputHash) {
      return user;
    }
    return null;
  },

  async register(email: string, password: string, name: string): Promise<UserDB | null> {
    const existing = await db.users.where('email').equals(email).first();
    if (existing) return null;

    const now = new Date();
    const id = await db.users.add({
      email,
      passwordHash: btoa(password),
      name,
      role: 'GUEST',
      createdAt: now,
      updatedAt: now,
    });

    const user = await db.users.get(id);
    return user || null;
  },

  async getUserById(id: number): Promise<UserDB | undefined> {
    return await db.users.get(id);
  },

  async getUserByEmail(email: string): Promise<UserDB | undefined> {
    return await db.users.where('email').equals(email).first();
  },

  async getAllUsers(): Promise<UserDB[]> {
    return await db.users.toArray();
  },
};
