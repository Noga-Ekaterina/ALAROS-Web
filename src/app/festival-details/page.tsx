import React from 'react';
import FestivalProtections from "@/components/_festival-details/festival-protections/FestivalProtections";
import FestivalBusinessProgram from "@/components/_festival-details/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "@/components/_festival-details/festival-forum/FestivalForum";
import {fetchData} from "@/utils/fetchData";
import {IFestival, IFestivalDetails, IHtmlString, IJury, IProtectionsDay, IFestivalProgramDay} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import FestivalDetailsMainScreen
  from "@/components/_festival-details/festival-details-main-screen/FestivalDetailsMainScreen";
import FestivalProgram from "@/components/_festival-details/festival-program/FestivalProgram";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";

interface IData{
  festivalDetailss: IFestivalDetails[]
  festivalPrograms: IFestivalProgramDay[]
  protectionsDays: IProtectionsDay[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
          query FestivalQuery {
            festivalDetailss {
              mainScreenLeftSection {
                html
              }
              mainScreenProject {
                cover
                diploma
                signature
                images
                name
                nomination
                number
                winner
                year
              }
              isShowFestivalProgram
              festivalProgramTitle
              festivalProgramColumns {
                html
              }
              isShowProtectionsDays
              protectionsTitle
              businessProgramTitle
              businessProgramSessions {
                html
              }
              forumTitle
              forumRightSignature {
                html
              }
              forumImages
              forumDescriptionBlocks {
                html
              }
              forumRegistration {
                html
              }
              forumProgramTitle
              forumProgram {
                html
              }
              forumContactsTitle
              forumContactsImage
              forumContacts {
                html
              }
              forumSocials {
                html
              }
            }
            festivalPrograms(orderBy: date_ASC) {
              date
              schedule {
                html
              }
              businessProgram {
                html
              }
              businessProgramPosition
              fullVersionBusinessProgram{
                html
              }
            }
            protectionsDays(orderBy: date_ASC) {
              date
              protections {
                html
              }
            }
          }`)

  if (typeof data==="string"||!data){
    return data
  }

  const {festivalDetailss,festivalPrograms, protectionsDays}=data

  const result= {pageData: festivalDetailss[0], festivalProgram: festivalPrograms, protectionsDays}


  return result
},
    ["festival-details"], {tags: ["FestivalDetails", "Project", "ProtectionsDay", "FestivalProgram"]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (typeof data==="string" || !data) {
    revalidateTag("FestivalToPeople")
    return <div>произошла ошибка{data && `: ${data}`}, перезагрузите страницу</div>
  }


  const {pageData, festivalProgram, protectionsDays, }= data
  return (
      <AnimationPage>
        <ProjectModal projects={[pageData.mainScreenProject]} searchParams={searchParams}/>
        <FestivalDetailsMainScreen pageData={pageData}/>
        {pageData.isShowFestivalProgram && <FestivalProgram pageData={pageData} festivalProgram={festivalProgram}/>}
        <FestivalBusinessProgram pageData={pageData}/>
        {pageData.isShowProtectionsDays && <FestivalProtections title={pageData.protectionsTitle} protectionsDays={protectionsDays}/>}
        <FestivalForum pageData={pageData}/>
      </AnimationPage>

  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Фестиваль",
};

export default Page;