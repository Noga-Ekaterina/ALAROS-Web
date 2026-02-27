import React from 'react';
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import type {Metadata} from "next";
import {revalidateTag, unstable_cache} from "next/cache";
import {IAbout, IHistoryYear, IManagement} from "@/types/data";
import AboutMainScreen from "@/components/_about/about-main-screen/AboutMainScreen";
import Documents from "@/components/documents/Documents";
import AboutMain from "@/components/_about/about-main/AboutMain";
import AboutHistory from "@/components/_about/about-history/AboutHistory";
import AboutPresidium from "@/components/_about/about-presidium/AboutPresidium";
import Life from "@/components/life/Life";
import AboutPress from "@/components/_about/about-press/AboutPress";
import AboutMap from '@/components/_about/about-map/AboutMap';
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AboutManagement from "@/components/_about/about-management/AboutManagement";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import {fetchColection, fetchSingle} from "@/utils/strapFetch";
import {domain} from "@/variables";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const getPageData= unstable_cache(async ()=>{
  const data= await fetchSingle<IAbout>("about")

  return data
}, ["about"], {tags: ["about", "project", "nomination-projects"]})

const getHistory=unstable_cache(async ()=>{
  const data= await fetchColection<IHistoryYear>({
    name: "history-years",
    sort: "year:asc",
    pagination:{
      pageSize: 100
    }
  })

  return data
}, ["history-years"], {tags: ["history-year", "history-addition"]})

const getManagements=unstable_cache(async ()=>{
  const data= await fetchColection<IManagement>({
    name: "managements",
    sort: "position:asc",
    pagination:{
      pageSize: 100
    }
  })

  return data
}, ["managements"], {tags: ["management"]})

const MyComponent = async ({searchParams}:Props) => {
  const [pageData, history, management]= await Promise.all([getPageData(), getHistory(), getManagements()])

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("about")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <AboutMainScreen pageData={pageData}/>
        <AboutMain pageData={pageData}/>
        <Documents links={pageData.documentsLinks} buttonDetails={pageData.membership} linksDetails={pageData.membershipLinks} isDisabledDetails={pageData.membershipDisabled}/>
        <AboutHistory title={pageData.historyTitle} data={history?.data}/>
        <AboutManagement pageData={pageData} management={management?.data}/>
        <AboutPresidium title={pageData.presidiumTitle} data={pageData.presidium}/>
        <Life title={pageData.lifeTitle} signatures={pageData.lifeSignature} life={pageData.life}/>
        <AboutPress pageData={pageData}/>
        <AboutMap pageData={pageData}/>
        <PartnersSlider/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | О нас",
  alternates:{
    canonical: `${domain}/about`
  }
};

export const dynamic = 'force-dynamic';

export default MyComponent;
