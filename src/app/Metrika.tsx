'use client'
import React, {Suspense, useCallback, useEffect} from 'react';
import ym, { YMInitializer } from "react-yandex-metrika";
import { usePathname, useSearchParams } from "next/navigation";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import {usePageViews, YandexMetrika} from "@mrr_97/next-yandex-metrika";

const Metrika = () => {
  const { isCookie } = store;

  usePageViews()

  if (!isCookie) return null

  return (
      <Suspense>
        <YandexMetrika yid={Number(process.env.NEXT_PUBLIC_YANDEX_ID)}/>
      </Suspense>
  )
};

export default observer(Metrika);