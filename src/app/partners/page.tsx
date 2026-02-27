import React from 'react';
import AnimationPage from "@/app/AnimationPage";
import NotFoundSample from "@/components/not-found-sample/NotFoundSample";
import type {Metadata} from "next";
import {domain} from "@/variables";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchSingle} from "@/utils/strapFetch";
import {IPartners} from "@/types/data";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import PartnersMainScreen from "@/components/_partners/partners-main-screen/PartnersMainScreen";
import Documents from "@/components/documents/Documents";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import PartnersClub from "@/components/_partners/partners-club/PartnersClub";
import PartnersContacts from "@/components/_partners/partners-contacts/PartnersContacts";
import Life from "@/components/life/Life";
import PartnersEvents from "@/components/_partners/partners-events/PartnersEvents";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init=unstable_cache(async ()=>{
  const data=await fetchSingle<IPartners>("partners")
  return data
}, ["partners-page"], {tags: ["partners", "project", "nomination-projects"]})

const MyComponent = async ({searchParams}: Props) => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("partners")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <PartnersMainScreen pageData={pageData}/>
        <PartnersClub pageData={pageData}/>
        <PartnersContacts pageData={pageData}/>
        <Life title={pageData.lifeTitle} signatures={pageData.lifeSignatures} life={pageData.life}/>
        {pageData.isShowEvents && <PartnersEvents pageData={pageData}/>}
        <PartnersSlider/>
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
