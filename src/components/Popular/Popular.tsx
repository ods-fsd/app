'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query'; 

import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { fetchStories } from '@/lib/api/clientApi';
import { useStoriesPerPageMain } from '@/hooks/useStoriesPerPageMain';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';

import css from './Popular.module.css';

type PopularProps = {
  showLoadMore?: boolean; 
};

export const Popular = ({
  showLoadMore = false, 
}: PopularProps) => {
  const urlPath = usePathname();
  const isHomePage = urlPath === '/';

  
  const { perPage, isMobile, isMounted } = useStoriesPerPageMain();

  
  const { data, error, isLoading } = useQuery({
    queryKey: ['stories', 'all', perPage],
    queryFn: () => fetchStories(perPage, 1, null),
    enabled: isMounted,
  });


  const stories = data?.data ?? [];

  return (
    <section
      className={isHomePage ? css.container : css.popularSection}
      aria-label="popular"
    >
      <h2 className={css.title}>
        Популярні історії
      </h2>

      {stories.length > 0 && isMounted && (
        <>
          <TravellersStories
            stories={stories}
            isHiddenOnMobileButton={isMobile}
          />
          
          {!showLoadMore && (
            <Link href="/stories" className={css.button}>
              Переглянути всі
            </Link>
          )}
        </>
      )}
      
      {error && <ErrorMessage message="Щось пішло не так при завантаженні" />}
      
      {(!isMounted || isLoading) && stories.length === 0 && !error && (
        <Loader isFullScreen={false} />
      )}
    </section>
  );
};

export default Popular;