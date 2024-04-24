'use client'
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [videoURL, setVideoURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleDownload = async () => {
    try {
      setShowDialog(true);
      setTimeout(() => {
        setShowDialog(false);
      }, 6000);

      const response = await axios.post('https://fedaf3a6-274a-4de3-b0ae-b68bf73653a5-00-31b7ivstn9r5e.pike.replit.dev/download', { videoURL }, { responseType: 'blob' });

      const randomString = generateRandomString(10);
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `snowman-vidget-${randomString}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setShowDialog(false);
      setErrorMessage('Failed to download video');
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">Snowman vidget</h1>
      <h2 className="text-2xl font-semibold mb-4 text-red-400">YT Video Downloader</h2>
      <p className="text-sm mb-8 text-gray-500">Created by Robin</p>
      
      <div className="mb-6 w-full max-w-md">
        <input
          className="border border-gray-300 p-2 rounded-md w-full"
          type="text"
          placeholder="Enter YouTube URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
        onClick={handleDownload}
      >
        Download
      </button>

      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      
      {showDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-xl mb-4">Download will start in 5 seconds...</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;