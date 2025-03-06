import React from 'react';
import {ICompetitionResults, IFestival, IHtmlString, IJury} from "@/types/data";
import {unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import CompetitionResultsMainScreen
  from "@/components/_competition-results/competition-results-main-screen/CompetitionResultsMainScreen";
import Results from "@/components/_competition-results/results/Results";


interface IData{
  competitionResultsS: ICompetitionResults[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data: null|IData= await fetchData(`
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

  return data? data.competitionResultsS[0] : null

  }, ["competition-results"], {tags: ["CompetitionResults"]})

const Page = async ({searchParams}:Props) => {
  const pageData= await init()

  if (!pageData) return <div>произошла ошибка, перезагрузите страницу</div>

  return (
      <>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <CompetitionResultsMainScreen pageData={pageData}/>
        <Results pageData={pageData}/>
      </>
  );
};

export default Page;
