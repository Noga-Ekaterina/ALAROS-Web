'use client'
import React, { useCallback, useEffect } from 'react';
import ym, { YMInitializer } from "react-yandex-metrika";
import { usePathname, useSearchParams } from "next/navigation";
import store from "@/store/store";
import { observer } from "mobx-react-lite";
import {usePageViews, YandexMetrika} from "@mrr_97/next-yandex-metrika";

const Metrika = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isCookie } = store;

  usePageViews()

  return (
      <YandexMetrika yid={104943173}/>
  )
};

export default observer(Metrika);