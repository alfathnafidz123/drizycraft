'use client';

import Image from 'next/image';
import { FaSistrix } from '@react-icons/all-files/fa6/FaSistrix';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getHelpCenter } from '@/app/api/billing/getHelpCenter';
import { getHelpCenterDetail } from '@/app/api/billing/getHelpCenterDetail';
import { helpcenter1, helpcenter2 } from '~/images';
import { Loader } from "lucide-react";


interface Article {
  title: string;
  url: string;
}

interface HelpSection {
  category: string;
  count: number;
  articles: Article[];
  exploreUrl: string;
}

interface ApiHelpItem {
  name: string;
  group?: string;
}

interface ApiHelpResponse {
  data: ApiHelpItem[];
  meta?: {
    hasNextPage?: boolean;
  };
}

export default function HelpCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<HelpSection[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadHelpCenter();
  }, []);

  const loadHelpCenter = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response: ApiHelpResponse = await getHelpCenter({ page, limit: 15 });

      const groupedArticles: Record<string, Article[]> = {};

      response.data.forEach((item) => {
        const group = item.group || 'Others';
        const article: Article = {
          title: item.name || '-',
          url: `https://api.drizycraft.com/auth/admin/help/${encodeURIComponent(item.name)}`,
        };

        if (!groupedArticles[group]) groupedArticles[group] = [];
        groupedArticles[group].push(article);
      });

      let parsedSections: HelpSection[] = Object.entries(groupedArticles).map(
        ([group, articles]) => ({
          category: group,
          count: articles.length,
          articles,
          exploreUrl: `/help?category=${encodeURIComponent(group)}`,
        })
      );

      // Urutkan kategori berdasarkan abjad A-Z
      parsedSections.sort((a, b) => a.category.localeCompare(b.category));

      setSections(page === 1 ? parsedSections : [...sections, ...parsedSections]);

      if (page === 1 && parsedSections.length > 0) {
        setExpandedSections([0]);
      }

      setHasMore(response.meta?.hasNextPage || false);
    } catch (err) {
      console.error(err);
      setError('Failed to load help center data.');
    } finally {
      setLoading(false);
    }
  };

  const filteredSections = useMemo(() => {
    if (!searchTerm) return sections;
    const lowerSearch = searchTerm.toLowerCase();
    return sections.filter((section) =>
      section.articles.some((article) =>
        article.title.toLowerCase().includes(lowerSearch)
      )
    );
  }, [sections, searchTerm]);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const detailHelpCenter = async (title: string) => {
    setLoading(true);
    try {
      const detail = await getHelpCenterDetail({ title });
      sessionStorage.setItem('helpDetail', JSON.stringify(detail));

      const url = `/help-center/${encodeURIComponent(detail.name)}`;
      window.open(url, '_blank');
    } catch (err) {
      console.error('Failed to fetch help detail:', err);
      setError('Failed to load help article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-[#F4F6FC] py-10">
        <h1 className="text-center text-4xl text-[#1A214C] font-bold mb-7 tracking-wide">
          HELP CENTER
        </h1>

        <section className="max-w-screen-lg mx-auto w-full">
          {/* Search Box */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-4 h-[54px] w-[480px] bg-white pl-6 pr-4 shadow-lg rounded-full">
              <FaSistrix className="text-[#999]" />
              <input
                type="text"
                placeholder="Type your question here..."
                className="w-full border-none outline-none text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading && <div className="flex justify-center">
            <Loader className="animate-spin" />  
          </div>}
          {/* Error Message */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Accordion Section */}
          {!loading &&
            !error &&
            filteredSections.map((section, idx) => (
              <div
                key={section.category}
                className="bg-white shadow-lg rounded-xl p-6 mb-12 mx-6"
              >
                <div
                  className="flex items-center bg-[#E4F6FB] rounded-lg py-4 px-6 cursor-pointer"
                  onClick={() => toggleSection(idx)}
                >
                  <Image src={helpcenter1} alt="Help Center" width={32} height={32} />
                  <p className="font-katide-bold ml-4 mt-3 text-[30px] text-[#4065D1]">
                    {section.category}
                  </p>
                  <span className="ml-4 flex items-center justify-center h-8 w-8 rounded-full bg-[#CECECE] text-xs font-bold text-[#4065D1]">
                    {section.count}
                  </span>
                </div>

                <div
                  className={`transition-all overflow-hidden ml-10 mt-6 space-y-6 ${
                    expandedSections.includes(idx) ? 'max-h-[1000px]' : 'max-h-0'
                  }`}
                >
                  {section.articles.map((article, i) => (
                    <div
                      key={`${section.category}-${i}`}
                      className="flex flex-col items-start space-y-2"
                    >
                      <div
                        className="flex items-start space-x-4 cursor-pointer"
                        onClick={() => detailHelpCenter(article.title)}
                      >
                        <Image
                          src={helpcenter2}
                          alt="icon"
                          width={24}
                          height={24}
                          className="mt-1"
                        />
                        <p className="text-lg font-semibold text-[#4065D1] hover:underline">
                          {article.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {!loading && !error && filteredSections.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No results found for “{searchTerm}”.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
