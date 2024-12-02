// pages/index.tsx

"use client";

import React, { useState } from 'react';
import { RefreshCw, Copy } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const BeaconIDGenerator = () => {
  const [uuid, setUuid] = useState('');
  const [eddystoneUID, setEddystoneUID] = useState('');
  const [namespaceID, setNamespaceID] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const generateIDs = () => {
    const newUuid = crypto.randomUUID();
    const newEddystoneUID = crypto.randomUUID().replace(/-/g, '').slice(0, 20).toUpperCase();
    const newNamespaceID = crypto.randomUUID().replace(/-/g, '').slice(0, 10).toUpperCase();

    setUuid(newUuid);
    setEddystoneUID(newEddystoneUID);
    setNamespaceID(newNamespaceID);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000); // Hide notification after 2 seconds
    } catch (err) {
      console.error('Failed to copy!', err);
      // Optionally, set an error state to display a notification
    }
  };

  return (
    <div
      className={`${GeistSans.className} ${GeistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative max-w-6xl mx-auto`}
    >
      {/* Head Component for Page Title */}
      <Head>
        <title>Beacon ID Generator</title>
        <meta name="description" content="Generate Beacon IDs with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Notification for Copy Actions */}
      {copiedText && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Copied to clipboard!
        </div>
      )}

      {/* Main Content */}
      <main className="flex flex-col gap-8 items-center sm:items-start w-full">
        {/* Centered Beacon Image */}
        <div className="flex justify-center w-full">
          <Image
            src="/beacon.png"
            alt="Beacon Icon"
            width={180}
            height={180}
            className="dark:invert"
          />
        </div>

        {/* Beacon ID Generator Interface */}
        <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-2xl w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            {/* iBeacon Section */}
            <div className="w-full sm:w-1/2 p-8 border-b sm:border-b-0 sm:border-r dark:border-gray-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                iBeacon UUID
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-between flex-wrap">
                <span className="truncate mr-2 text-gray-700 dark:text-gray-300 flex-grow">
                  {uuid || 'Generate UUID'}
                </span>
                {uuid && (
                  <button
                    onClick={() => copyToClipboard(uuid)}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label="Copy UUID"
                  >
                    <Copy size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Eddystone Section */}
            <div className="w-full sm:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Eddystone UID
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                {/* UID */}
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">UID</span>
                  {eddystoneUID && (
                    <button
                      onClick={() => copyToClipboard(eddystoneUID)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="Copy UID"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
                <div className="truncate text-gray-700 dark:text-gray-300">
                  {eddystoneUID || 'Generate UID'}
                </div>

                {/* Namespace */}
                <div className="flex items-center justify-between mt-4 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Namespace</span>
                  {namespaceID && (
                    <button
                      onClick={() => copyToClipboard(namespaceID)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="Copy Namespace"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
                <div className="truncate text-gray-700 dark:text-gray-300">
                  {namespaceID || 'Generate Namespace'}
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 text-center">
            <button
              onClick={generateIDs}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 
              transition-all duration-300 ease-in-out transform hover:scale-105 
              dark:bg-blue-600 dark:hover:bg-blue-700 flex items-center justify-center mx-auto"
            >
              <RefreshCw className="mr-2" /> Generate Beacon IDs
            </button>
          </div>
        </div>
      </main>

      {/* Updated Footer */}
      <footer className="flex items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Naing Min Oo 2024
        </p>
      </footer>
    </div>
  );
};

export default BeaconIDGenerator;