'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { onboardUser } from '@/lib/actions/user.actions'; // Import the server action

export default function OnboardingPage({ params }: { params: { address: string } }) {
  const { address } = params;
  const [name, setName] = useState('');
  const [instaAccUrl, setInstaAccUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Create form data to send to the server action
    const formData = new FormData();
    formData.append('name', name);
    formData.append('instaAccUrl', instaAccUrl);

    try {
      // Use the server action directly
      await onboardUser(formData, address);

      // Navigate to the portfolio page after successful onboarding
      router.push(`/portfolio/${address}`);
    } catch (error) {
      console.error('Error during onboarding:', error);
      alert('Failed to onboard. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Onboard Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL (Optional)</label>
            <input
              type="url"
              value={instaAccUrl}
              onChange={(e) => setInstaAccUrl(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
