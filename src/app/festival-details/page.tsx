import React from 'react';
import FestivalProtections from "@/components/_festival-details/festival-protections/FestivalProtections";
import FestivalBusinessProgram from "@/components/_festival-details/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "@/components/_festival-details/festival-forum/FestivalForum";
import {IFestival, IFestivalDetails} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import FestivalDetailsMainScreen
  from "@/components/_festival-details/festival-details-main-screen/FestivalDetailsMainScreen";
import FestivalProgram from "@/components/_festival-details/festival-program/FestivalProgram";
import type {Metadata} from "next";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import InfopartnersSlider from "@/components/partners-slider/infopartners/InfopartnersSlider";
import {fetchSingle} from "@/utils/strapFetch";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IFestivalDetails>("festival-details")

  return data
},
    ["festival-details"], {tags: ["festival-details",]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("festival-details")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }


  return (
      <>
        <FestivalDetailsMainScreen pageData={data}/>
        {
          data.isShowAllContent?
              <>
                {data.isShowFestivalProgram && <FestivalProgram pageData={data} festivalProgram={data.festivalProgram}/>}
                <FestivalBusinessProgram pageData={data}/>
                {data.isShowProtectionsDays && <FestivalProtections title={data.protectionsTitle} protectionsRightSignature={data.protectionsRightSignature} protectionsDays={data.protectionsDays} protectionsColumns={data.protectionsColumns}/>}
                {data.isShowInfopartners && <InfopartnersSlider
                  infopartners={data.infopartners}
                  infopartnersTitle={data.infopartnersTitle}
                  infopartnersText={data.infopartnersText}
                />}
                {data.isShowForum && <FestivalForum pageData={data}/>}
              </>
              :
              <NotFoundSample title={"Скоро тут что-то будет"} mainText={"Soon"} mainTextMobile={"So\non"} subtitle="Но пока ещё ничего нет"/>
        }
      </>

  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Фестиваль",
};

export default Page;
