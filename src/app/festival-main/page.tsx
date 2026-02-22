import React from 'react';
import FestivalMainScreen from "../../components/_festival/festival-main-screen/FestivalMainScreen";
import FestivalPremiya from "../../components/_festival/festival-premiya/FestivalPremiya";
import FestivalPrice from "../../components/_festival/festival-price/FestivalPrice";
import FestivalDate from "../../components/_festival/festival-date/FestivalDate";
import FestivalBid from "../../components/_festival/festival-bid/FestivalBid";
import FestivalDocuments from "../../components/_festival/festival-documents/FestivalDocuments";
import FestivalEmails from "../../components/_festival/festival-emails/FestivalEmails";
import FestivalDiploma from "../../components/_festival/festival-diploma/FestivalDiploma";
import FestivalJuries from "../../components/_festival/festival-juries/FestivalJuries";
import FestivalProjects from "../../components/_festival/festival-projects/FestivalProjects";
import {IFestival, IHtmlString,} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import {fetchSingle} from "@/utils/strapFetch";

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IFestival>("festival-main")

  return data
},
    ["festival-main"], {tags: ["festival-main", "input", "project"]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("festival-main")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ProjectModal projects={data.projects} searchParams={searchParams}/>
        <FestivalMainScreen pageData={data}/>
        <FestivalPremiya pageData={data}/>
        <FestivalPrice pageData={data}/>
        <FestivalDate pageData={data}/>
        <FestivalBid pageData={data}/>
        <FestivalDocuments pageData={data}/>
        <FestivalEmails pageData={data}/>
        <FestivalDiploma pageData={data} />
        <FestivalJuries title={data.juriesTitle} juriesCommiteds={data.juriesCommited}/>
        <FestivalProjects pageData={data}/>
        <PartnersSlider/>
      </AnimationPage>

  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Фестиваль",
};

export default Page;