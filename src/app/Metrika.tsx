'use client'
import React, {useEffect} from 'react';
import ym, {YMInitializer} from "react-yandex-metrika";
import {usePathname} from "next/navigation";
import store from "@/store/store";
import {observer} from "mobx-react-lite";

const Metrika = () => {
  const pathname = usePathname();
  const {isCookie}=store

  // Отправляем событие "hit" при изменении маршрута
  useEffect(() => {
    if (isCookie && pathname) {
      ym("hit", pathname);
    }
  }, [isCookie, pathname]);

  return (
      <YMInitializer
          accounts={[104943173]}
          options={{
            defer: true,
            webvisor: true,
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
          }}
          version="2"
      />
  );
};

export default observer(Metrika);
