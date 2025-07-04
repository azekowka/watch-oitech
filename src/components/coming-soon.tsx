'use client';

import NotFoundPage from './404';

// Simple wrapper that reuses NotFoundPage animations but with different text
export default function ComingSoonPage() {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white gap-4">
      <h1 className="text-5xl font-bold">Coming soon</h1>
      <p className="text-lg opacity-70">This feature is under development.</p>
    </div>
  );
} 