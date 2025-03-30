import React from 'react';
import {ICompetitionResults, IFestival, IHtmlString, IJury} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CompetitionResultsMainScreen
  from "@/components/_competition-results/competition-results-main-screen/CompetitionResultsMainScreen";
import Results from "@/components/_competition-results/results/Results";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";


interface IData{
  competitionResultsS: ICompetitionResults[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
    query MyQuery {
      competitionResultsS {
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
          winner
          year
        }
        resultsTitle
        results {
          html
        }
      }
    }
  `)

  if (typeof data==="string"){
    return data
  }

  return data? data.competitionResultsS[0] : null

  }, ["competition-results"], {tags: ["CompetitionResults", "Project"]})

const Page = async ({searchParams}:Props) => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("CompetitionResults")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <CompetitionResultsMainScreen pageData={pageData}/>
        <Results pageData={pageData}/>
        <PartnersSlider/>
      </>
  );
};

export default Page;
