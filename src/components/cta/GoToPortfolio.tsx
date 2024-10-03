"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const GoToPortfolio = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const tronWeb = window.tronLink.tronWeb;

      if (tronWeb) {
        setWalletAddress(tronWeb.defaultAddress.base58);
      } else {
        alert('Please connect to TronLink');
      }
    };

    fetchWalletAddress();
  }, []);

  const handlePortfolioRedirect = () => {
    if (walletAddress) {
      router.push(`/portfolio/${walletAddress}`);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <button onClick={handlePortfolioRedirect}>PORTFOLIO</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GoToPortfolio;
