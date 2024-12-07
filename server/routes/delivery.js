import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, isDeliveryPartner } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get active deliveries for the delivery partner
router.get('/active', authenticateToken, isDeliveryPartner, async (req, res) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      where: {
        deliveryId: req.user.id,
        status: {
          in: ['assigned', 'picked']
        }
      },
      include: {
        order: {
          include: {
            service: true
          }
        }
      }
    });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get delivery history
router.get('/history', authenticateToken, isDeliveryPartner, async (req, res) => {
  try {
    const deliveries = await prisma.delivery.findMany({
      where: {
        deliveryId: req.user.id,
        status: 'delivered'
      },
      include: {
        order: {
          include: {
            service: true
          }
        }
      },
      orderBy: {
        deliveredAt: 'desc'
      }
    });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update delivery status
router.patch('/:id/status', authenticateToken, isDeliveryPartner, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const delivery = await prisma.$transaction(async (prisma) => {
      const delivery = await prisma.delivery.update({
        where: { id },
        data: {
          status,
          ...(status === 'picked' ? { pickedAt: new Date() } : {}),
          ...(status === 'delivered' ? { deliveredAt: new Date() } : {})
        },
        include: {
          order: true
        }
      });

      await prisma.order.update({
        where: { id: delivery.orderId },
        data: { status }
      });

      return delivery;
    });

    // Emit socket event for real-time updates
    req.app.get('io').emit('deliveryUpdated', delivery);

    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;