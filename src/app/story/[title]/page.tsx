/* eslint-disable @next/next/no-img-element */
'use client';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Stories from 'react-insta-stories';
import { toast } from 'react-toastify';

import { storyByTitle } from '@/app/api/article/storyByTitle';
import { ResStoryByTitle, StoryI } from '@/interfaces/article.interfaces';

export default function Story({
  params: { title },
}: {
  params: { title: string };
}) {
  const [story, setStory] = useState<StoryI>();
  const router = useRouter();

  const getStories = useCallback(async () => {
    try {
      const res: ResStoryByTitle = await storyByTitle(title);
      setStory(res.data);
    } catch (error) {
      const err = error as AxiosError;
      const errorData: any = err.response?.data;
      toast.error((errorData.message as string) ?? 'Cannot get articles');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getStories();
  }, [getStories]);

  return (
    <>
      <div
        onClick={() => {
          router.back();
        }}
        className='fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-50'
      ></div>
      <div className='relative !z-50 flex w-full items-center justify-center'>
        {story ? (
          <Stories
            stories={story?.storyItem.map((item) => ({
              url: item.url,
              duration: 3000,
              seeMore: () => {
                if (item.actionUrl) {
                  window.open(item.actionUrl);
                }
              },
            }))}
            defaultInterval={1500}
            width={432}
            height={768}
          />
        ) : null}
      </div>
    </>
  );
}
