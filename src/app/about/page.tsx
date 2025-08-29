import React from 'react';
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import type {Metadata} from "next";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import {IAbout} from "@/types/data";
import AboutMainScreen from "@/components/_about/about-main-screen/AboutMainScreen";
import AboutDocuments from "@/components/_about/about-documents/AboutDocuments";
import AboutMain from "@/components/_about/about-main/AboutMain";
import AboutHistory from "@/components/_about/about-history/AboutHistory";
import AboutPresidium from "@/components/_about/about-presidium/AboutPresidium";
import AboutLife from "@/components/_about/about-life/AboutLife";
import AboutPress from "@/components/_about/about-press/AboutPress";
import AboutMap from '@/components/_about/about-map/AboutMap';
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AboutManagement from "@/components/_about/about-management/AboutManagement";

interface IData{
  abouts: IAbout[]
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
    query MyQuery {
      abouts {
        mainScreenLeftSection {
          html
        }
        mainScreenProject {
          cover
          diploma
          images
          name
          nomination
          number
          signature
          year
          winner
        }
        mainAboutTitle
        mainAboutText {
          html
        }
        mainAboutLinks {
          html
        }
        mainAboutImage
        documentsLinks {
          html
        }
        membership {
          html
        }
        membershipLinks {
          html
        }
        membershipDisabled
        historyTitle
        historyContent {
          html
        }
        historyAdditions {
          html
        }
        peopleTitle
        managementTitle
        management {
          html
        }
        presidiumTitle
        presidium {
          html
        }
        life {
          html
        }
        lifeTitle
        lifeSignature {
          html
        }
        pressTitle
        press {
          html
        }
        mapTitle
        mapTopColumns {
          html
        }
        map
        mapInfoColumns {
          html
        }
        mapBottom {
          html
        }
      }
    }
  `)

  if (typeof data==="string"){
    return data
  }

  return data? data.abouts[0] : null

}, ["about"], {tags: ["About", "Project"]})


const MyComponent = async () => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("CompetitionResults")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        {/*<NotFoundSample title={"Скоро тут что-то будет"} mainText={"Soon"} mainTextMobile={"So\non"} subtitle="Но пока ещё ничего нет"/>*/}
        <AboutMainScreen pageData={pageData}/>
        <AboutMain pageData={pageData}/>
        <AboutDocuments pageData={pageData}/>
        <AboutHistory pageData={pageData}/>
        <AboutManagement pageData={pageData}/>
        <AboutPresidium title={pageData.presidiumTitle} data={pageData.presidium.html}/>
        <AboutLife pageData={pageData}/>
        <AboutPress pageData={pageData}/>
        <AboutMap pageData={pageData}/>
        <PartnersSlider/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | О нас",
};

export const dynamic = 'force-dynamic';

export default MyComponent;
