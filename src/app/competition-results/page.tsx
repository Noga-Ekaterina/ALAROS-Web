import React from 'react';
import {ICompetitionResults} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CompetitionResultsMainScreen
  from "@/components/_competition-results/competition-results-main-screen/CompetitionResultsMainScreen";
import Results from "@/components/_competition-results/results/Results";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import {fetchSingle} from '@/utils/strapFetch';
import {domain} from "@/variables";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<ICompetitionResults>("competition-results")

  if (!data || typeof data==="string"){
    return data
  }

  return data

  }, ["competition-results"], {tags: ["competition-results", "project"]})

const Page = async ({searchParams}:Props) => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("competition-results")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <CompetitionResultsMainScreen pageData={pageData}/>
        <Results pageData={pageData}/>
        <PartnersSlider/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Итоги конкурса",
  alternates:{
    canonical: `${domain}/competition-results`
  }
};

export default Page;
