'use client'

import React, { useState, useEffect } from 'react';
import { logInUser } from '@/lib/actions/user.actions'; // Ensure the correct import

const ConnectWalletButton = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tronLinkInstalled, setTronLinkInstalled] = useState(false);

  useEffect(() => {
    const checkTronLink = () => {
      if (window.tronLink || window.tronWeb) {
        setTronLinkInstalled(true);
      } else {
        setTronLinkInstalled(false);
      }
    };

    checkTronLink();
    window.addEventListener('load', checkTronLink);

    return () => {
      window.removeEventListener('load', checkTronLink);
    };
  }, []);

  const connectToWallet = async () => {
    if (tronLinkInstalled) {
      setTimeout(async () => {
        const tron = window.tronLink || window.tronWeb;
        const tronWeb = tron?.tronWeb || tron;

        if (tronWeb) {
          try {
            if (!tronWeb.ready) {
              await window.tronLink.request({ method: 'tron_requestAccounts' });
            }

            const wallet = tronWeb.defaultAddress?.base58;

            if (wallet) {
              setWalletAddress(wallet);
              setWalletConnected(true);
              console.log('Connected to wallet:', wallet);

              // Try to log in or create the user
              try {
                await logInUser(wallet); // Call your Prisma function
                console.log('User logged in or created successfully');
              } catch (error) {
                console.error('Error logging in user:', error);
                alert('Failed to log in or create the user.');
              }
            } else {
              alert('Please log into TronLink and connect your wallet.');
            }
          } catch (error) {
            console.error('Error connecting to wallet:', error); // Log the actual error for debugging
            alert('Failed to connect to the wallet. Please try again.');
          }
        } else {
          alert('TronLink is not initialized yet. Try again later.');
        }
      }, 1000);
    } else {
      alert('TronLink wallet not found. Please install it.');
    }
  };

  return (
    <div>
      <button onClick={connectToWallet}>
        {walletConnected ? `Wallet Connected: ${walletAddress}` : 'Connect TronLink Wallet'}
      </button>
      {!tronLinkInstalled && (
        <p>TronLink is not installed. Please install the TronLink extension.</p>
      )}
    </div>
  );
};

export default ConnectWalletButton;
