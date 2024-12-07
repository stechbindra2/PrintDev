import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get('/stats', authenticateToken, isAdmin, async (req, res) => {
  try {
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      activeDeliveryPartners
    ] = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { totalAmount: true }
      }),
      prisma.user.count({
        where: {
          role: 'delivery',
          isActive: true
        }
      })
    ]);

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      activeDeliveryPartners
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manage users
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isVerified: true,
        isActive: true,
        createdAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify user
router.patch('/users/:id/verify', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: { isVerified: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user status
router.patch('/users/:id/status', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { isActive }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all orders with details
router.get('/orders', authenticateToken, isAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        service: true,
        delivery: {
          include: {
            delivery: {
              select: {
                name: true,
                phone: true
              }
            }
          }
        }
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;