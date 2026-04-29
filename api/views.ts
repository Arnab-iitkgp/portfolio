import { Redis } from 'ioredis';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const redis = new Redis(process.env.portfolio_REDIS_URL || process.env.REDIS_URL || '');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Get the IP address
    const ip = (req.headers['x-forwarded-for'] as string) || 
               (req.headers['x-real-ip'] as string) || 
               req.socket.remoteAddress || 
               'anonymous';

    // 2. Hash the IP to maintain privacy
    const hash = crypto
      .createHash('sha256')
      .update(ip)
      .digest('hex');

    const totalViewsKey = 'portfolio:total_views';
    const visitorKey = `portfolio:visitor:${hash}`;

    // 3. Check if this hash has visited before
    const hasVisited = await redis.get(visitorKey);

    if (!hasVisited) {
      // 4. Increment total views and mark as visited for 24h
      await redis.incr(totalViewsKey);
      await redis.set(visitorKey, 'true', 'EX', 86400);
    }

    // 5. Get current total
    const totalViews = await redis.get(totalViewsKey);

    return res.status(200).json({ count: parseInt(totalViews || '0', 10) });
  } catch (error) {
    console.error('Counter error:', error);
    return res.status(500).json({ error: 'Failed to update counter' });
  }
}
