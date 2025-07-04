import React from 'react';
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import type {Metadata} from "next";

const MyComponent = () => {
  return (
      <AnimationPage>
        <NotFoundSample title={"Скоро тут что-то будет"} mainText={"Soon"} mainTextMobile={"So\non"} subtitle="Но пока ещё ничего нет"/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | О нас",
};

export default MyComponent;
