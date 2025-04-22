'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HelpDetailPage() {
  const [article, setArticle] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const detail = sessionStorage.getItem('helpDetail');
    if (detail) {
      setArticle(JSON.parse(detail));
    }
  }, []);

  if (!article) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading detail...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="relative max-w-6xl mx-auto px-4 py-4 flex items-center justify-center">
          <button
            onClick={() => router.push('/help-center')}
            className="absolute left-4 text-xl text-blue-600 hover:text-blue-800 hover:underline"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-semibold text-[#4065D1]">Help Center</h2>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto py-14 px-6">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 transition-all hover:shadow-2xl">
          <h1 className="text-3xl font-extrabold text-[#4065D1] mb-6 tracking-tight">
            {article.name}
          </h1>
          <div
              className="text-gray-800 leading-relaxed text-[15px] space-y-5"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
        </div>
      </main>
    </div>
  );
}
