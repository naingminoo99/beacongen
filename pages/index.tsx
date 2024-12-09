"use client";

import React, { useState } from 'react';
import { RefreshCw, Copy } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

const BeaconIDGenerator = () => {
  const [uuid, setUuid] = useState('');
  const [uuidTrimmed, setUuidTrimmed] = useState('');
  const [eddystoneUID, setEddystoneUID] = useState('');
  const [namespaceID, setNamespaceID] = useState('');
  const [instanceID, setInstanceID] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const generateIDs = () => {
    const newUuid = crypto.randomUUID();
    const newUuidTrimmed = newUuid.replace(/-/g, '');
    
    // Generate Namespace as 20 numbers (0-9)
    const newNamespaceID = Array.from(
      crypto.getRandomValues(new Uint32Array(20)), 
      num => (num % 10).toString()
    ).join('');
    
    // Generate Instance ID as 12 alphanumeric characters
    const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newInstanceID = Array.from(
      crypto.getRandomValues(new Uint32Array(12)), 
      num => alphanumeric[num % alphanumeric.length]
    ).join('');

    const newEddystoneUID = newNamespaceID + newInstanceID;

    setUuid(newUuid);
    setUuidTrimmed(newUuidTrimmed);
    setNamespaceID(newNamespaceID);
    setInstanceID(newInstanceID);
    setEddystoneUID(newEddystoneUID);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div
      className={`${GeistSans.className} ${GeistMono.className} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative max-w-6xl mx-auto`}
    >
      <Head>
        <title>Beacon ID Generator</title>
        <meta name="description" content="Generate Beacon IDs with ease" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {copiedText && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          Copied to clipboard!
        </div>
      )}

      <main className="flex flex-col gap-8 items-center sm:items-start w-full">
        <div className="flex justify-center w-full">
          <Image
            src="/beacon.png"
            alt="Beacon Icon"
            width={180}
            height={180}
            className="dark:invert"
          />
        </div>

        <div className="bg-white dark:bg-gray-700 shadow-2xl rounded-2xl w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 p-8 border-b sm:border-b-0 sm:border-r dark:border-gray-600">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                iBeacon UUID
              </h2>
              {/* Original UUID */}
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

              {/* Trimmed UUID */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-between flex-wrap">
                <span className="truncate mr-2 text-gray-700 dark:text-gray-300 flex-grow">
                  {uuidTrimmed || 'Generate Trimmed UUID'}
                </span>
                {uuidTrimmed && (
                  <button
                    onClick={() => copyToClipboard(uuidTrimmed)}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    aria-label="Copy Trimmed UUID"
                  >
                    <Copy size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Eddystone UID
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                {/* Namespace (20 Numbers) */}
                <div className="flex items-center justify-between mb-2 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Namespace (20 Numbers)</span>
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

                {/* Instance ID (12 Alphanumeric) */}
                <div className="flex items-center justify-between mt-4 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Instance ID (12 Characters)</span>
                  {instanceID && (
                    <button
                      onClick={() => copyToClipboard(instanceID)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="Copy Instance ID"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
                <div className="truncate text-gray-700 dark:text-gray-300">
                  {instanceID || 'Generate Instance ID'}
                </div>

                {/* Full UID */}
                <div className="flex items-center justify-between mt-4 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Full UID</span>
                  {eddystoneUID && (
                    <button
                      onClick={() => copyToClipboard(eddystoneUID)}
                      className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      aria-label="Copy Full UID"
                    >
                      <Copy size={16} />
                    </button>
                  )}
                </div>
                <div className="truncate text-gray-700 dark:text-gray-300">
                  {eddystoneUID || 'Generate Full UID'}
                </div>
              </div>
            </div>
          </div>

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

      <footer className="flex items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © Naing Min Oo 2024
        </p>
      </footer>
    </div>
  );
};

export default BeaconIDGenerator;