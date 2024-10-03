import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma'; // Adjust path to your prisma

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;

  try {
    // Fetch user based on the wallet address
    const user = await prisma.user.findUnique({
      where: { accountAddress: address as string },
      include: {
        // todo : add the other fields
        userInfo: true, 
        songs: true,     
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}
