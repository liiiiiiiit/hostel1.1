// Backend Entry Point - Express.js Server
// This file demonstrates how to create a real Node.js backend

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password (use bcrypt in production)
    // const isValid = await bcrypt.compare(password, user.passwordHash);
    
    // Return user data (without password)
    const { passwordHash, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check if user exists
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Hash password (use bcrypt in production)
    // const passwordHash = await bcrypt.hash(password, 10);
    const passwordHash = password; // Demo only

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: 'GUEST'
      }
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    
    res.status(201).json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Hostel routes
app.get('/api/hostels', async (req, res) => {
  try {
    const hostels = await prisma.hostel.findMany({
      where: { published: true },
      include: {
        translations: true,
        rooms: {
          include: {
            translations: true
          }
        }
      }
    });

    res.json({ success: true, data: hostels });
  } catch (error) {
    console.error('Get hostels error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/hostels/:slug', async (req, res) => {
  try {
    const hostel = await prisma.hostel.findUnique({
      where: { slug: req.params.slug },
      include: {
        translations: true,
        rooms: {
          include: {
            translations: true
          }
        }
      }
    });

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    res.json({ success: true, data: hostel });
  } catch (error) {
    console.error('Get hostel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Booking routes
app.post('/api/bookings', async (req, res) => {
  try {
    const { hostelId, userId, roomTypeId, checkIn, checkOut, guests, guestName, guestEmail } = req.body;

    // Validate input
    if (!hostelId || !userId || !roomTypeId || !checkIn || !checkOut || !guests || !guestName || !guestEmail) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Check availability
    const room = await prisma.roomType.findUnique({
      where: { id: roomTypeId }
    });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const existingBookings = await prisma.booking.findMany({
      where: {
        roomTypeId,
        status: { notIn: ['CANCELLED', 'REJECTED'] },
        checkIn: { lt: new Date(checkOut) },
        checkOut: { gt: new Date(checkIn) }
      }
    });

    if (existingBookings.length >= room.beds) {
      return res.status(409).json({ error: 'Room not available' });
    }

    // Calculate price
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = room.pricePerNight * nights;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        hostelId,
        userId,
        roomTypeId,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        guests,
        guestName,
        guestEmail,
        totalPrice,
        status: 'PENDING'
      }
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [
      totalUsers,
      totalHostels,
      pendingBookings,
      totalJobs,
      totalBusinesses,
      publishedArticles
    ] = await Promise.all([
      prisma.user.count(),
      prisma.hostel.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.job.count(),
      prisma.business.count(),
      prisma.article.count({ where: { status: 'PUBLISHED' } })
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalHostels,
        pendingBookings,
        totalJobs,
        totalBusinesses,
        publishedArticles
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Database: PostgreSQL`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});
