'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type NavigationMethod = 'push' | 'replace';

const scrollToTop = () => {
  const rootElement = document.querySelector<HTMLElement>(".lenis.lenis-smooth") ?? document.documentElement;

  rootElement.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
};

const resetScrollAfterNavigation = () => {
  scrollToTop();
  requestAnimationFrame(scrollToTop);
  setTimeout(scrollToTop, 50);
};

export const useSearchParamsControl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = useCallback(
      (params: URLSearchParams, method: NavigationMethod = 'push', scroll?: boolean) => {
        const search = params.toString();
        const queryString = search ? `?${search}` : '';

        if (method === 'replace') {
          router.replace(`${pathname}${queryString}`, {scroll});
        } else {
          router.push(`${pathname}${queryString}`, {scroll});
        }

        if (scroll !== false) {
          resetScrollAfterNavigation();
        }
      },
      [router, pathname]
  );

  const setParam = useCallback(
      (
          key: string,
          value: string,
          options?: { method?: NavigationMethod, scroll?: boolean}
      ) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        updateUrl(newParams, options?.method, options?.scroll);
      },
      [searchParams, updateUrl]
  );

  const deleteParam = useCallback(
      (
          key: string,
          options?: { method?: NavigationMethod }
      ) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(key);
        updateUrl(newParams, options?.method);
      },
      [searchParams, updateUrl]
  );

  const clearParams = useCallback(
      (options?: { method?: NavigationMethod }) => {
        const newParams = new URLSearchParams();
        updateUrl(newParams, options?.method);
      },
      [updateUrl]
  );

  const setMultipleParams = useCallback(
      (params: Record<string, string | null>, options?: { method?: NavigationMethod, scroll?: boolean }) => {
        const newParams = new URLSearchParams(searchParams);

        // Удаляем только те параметры, которые явно переданы со значением `null`
        Object.entries(params).forEach(([key, value]) => {
           if (value === null || value === undefined) {
            newParams.delete(key);
          } else {
            newParams.set(key, value);
          }
        });

        updateUrl(newParams, options?.method, options?.scroll);
      },
      [searchParams, updateUrl]
  );

  return {
    setParam,
    deleteParam,
    clearParams,
    setMultipleParams,
    currentParams: Object.fromEntries(searchParams.entries()),
  };
};
