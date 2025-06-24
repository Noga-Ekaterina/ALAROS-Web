import React from 'react';
import type {Metadata} from "next";
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";

export const metadata: Metadata = {
  title: "АЛАРОС | 404",
};

const NotFound = () => {
  return (
      <AnimationPage>
        <NotFoundSample title={`Тут ничего \nне нашлось`} mainText={"404"} mainTextMobile={`40\n04`}/>
      </AnimationPage>
  );
};

export default NotFound;