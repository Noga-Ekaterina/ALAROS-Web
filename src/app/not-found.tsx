import React from 'react';
import type {Metadata} from "next";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";

export const metadata: Metadata = {
  title: "АЛАРОС | 404",
};

const NotFound = () => {
  return (
      <>
        <NotFoundSample title={`Тут ничего \nне нашлось`} mainText={"404"} mainTextMobile={`40\n04`}/>
      </>
  );
};

export default NotFound;
