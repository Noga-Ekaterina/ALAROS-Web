import React from 'react';
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import type {Metadata} from "next";
import {domain} from "@/variables";

const MyComponent = () => {
  return (
      <AnimationPage>
        <NotFoundSample title={"Скоро тут что-то будет"} mainText={"Soon"} mainTextMobile={"So\non"} subtitle="Но пока ещё ничего нет"/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Партнеры",
  alternates:{
    canonical: `${domain}/partners`
  }
};

export default MyComponent;
