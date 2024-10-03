'use client';

import { useRouter } from 'next/navigation';

export default function PortfolioClientComponent({ user }: { user: any }) {
  const router = useRouter();

  const handleOnboard = () => {
    router.push(`/onboard/${user.accountAddress}`);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto border-2 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">
          {user.userInfo?.name || 'Unknown User'}'s Portfolio
        </h1>
        <p className="text-gray-600 mb-8">Wallet Address: {user.accountAddress}</p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Songs:</h2>
          <ul className="space-y-4">
            {user.songs.map((song: any) => (
              <li key={song.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold">{song.name}</h3>
                <img src={song.thumbnail} alt={song.name} className="w-32 h-32 object-cover mt-2" />
                <p className="text-gray-500">Length: {song.length}</p>
                <p className="text-gray-500">Total Listening Hours: {song.totalListeninghrs}</p>
              </li>
            ))}
          </ul>
        </div>

        {!user.isOnboarded && (
          <button
            onClick={handleOnboard}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Onboard Now
          </button>
        )}
      </div>
    </div>
  );
}
