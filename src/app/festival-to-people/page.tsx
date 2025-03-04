import React from 'react';
import FestivalProtections from "@/components/_festival-to-people/festival-protections/FestivalProtections";
import FestivalBusinessProgram from "@/components/_festival-to-people/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "@/components/_festival-to-people/festival-forum/FestivalForum";
import {fetchData} from "@/utils/fetchData";
import {IFestival, IFestivalToPeople, IHtmlString, IJury, IProtectionsDay, IFestivalProgramDay} from "@/types/data";
import {unstable_cache} from "next/cache";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import FestivalToPeopleMainScreen
  from "@/components/_festival-to-people/festival-to-people-main-screen/FestivalToPeopleMainScreen";
import FestivalProgram from "@/components/_festival-to-people/festival-program/FestivalProgram";

interface IData{
  festivalToPeoples: IFestivalToPeople[]
  festivalPrograms: IFestivalProgramDay[]
  protectionsDays: IProtectionsDay[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data: IData| null= await fetchData(`
          query FestivalQuery {
            festivalToPeoples {
              mainScreenLeftSection {
                html
              }
              mainScreenPhoto
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

  if (!data)
    return null

  const {festivalToPeoples,festivalPrograms, protectionsDays}=data

  const result= {pageData: festivalToPeoples[0], festivalProgram: festivalPrograms, protectionsDays}


  return result
},
    ["festival-to-people"], {tags: ["FestivalToPeople", "ProtectionsDay", "FestivalProgram"]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (!data) return <div>произошла ошибка, перезагрузите страницу</div>

  const {pageData, festivalProgram, protectionsDays, }= data
  return (
      <div>
        <FestivalToPeopleMainScreen pageData={pageData}/>
        {pageData.isShowFestivalProgram && <FestivalProgram pageData={pageData} festivalProgram={festivalProgram}/>}
        <FestivalBusinessProgram pageData={pageData}/>
        {pageData.isShowProtectionsDays && <FestivalProtections title={pageData.protectionsTitle} protectionsDays={protectionsDays}/>}
        <FestivalForum pageData={pageData}/>
      </div>

  );
};

export default Page;