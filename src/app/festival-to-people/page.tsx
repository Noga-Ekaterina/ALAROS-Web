import React from 'react';
import FestivalProtections from "@/components/_festival-to-people/festival-protections/FestivalProtections";
import FestivalBusinessProgram from "@/components/_festival-to-people/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "@/components/_festival-to-people/festival-forum/FestivalForum";
import {fetchData} from "@/utils/fetchData";
import {IFestival, FestivalToPeople, IHtmlString, IJury, IProtectionsDay} from "@/types/data";
import {unstable_cache} from "next/cache";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";
import FestivalToPeopleMainScreen
  from "@/components/_festival-to-people/festival-to-people-main-screen/FestivalToPeopleMainScreen";

interface IData{
  festivalToPeoples: FestivalToPeople[]
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
              isShowProtectionsDays
              protectionsTitle
              businessProgramDate
              businessProgramTime
              businessProgramTitle
              businessProgramRightSignature {
                html
              }
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
            protectionsDays(orderBy: date_ASC) {
              date
              protections {
                html
              }
            }
          }`)

  if (!data)
    return null

  const {festivalToPeoples, protectionsDays}=data

  const result= {pageData: festivalToPeoples[0], protectionsDays}


  return result
},
    ["festival-to-people"], {tags: ["FestivalToPeople", "ProtectionsDay", ]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (!data) return <div>произошла ошибка, перезагрузите страницу</div>

  const {pageData, protectionsDays, }= data
  return (
      <div>
        <FestivalToPeopleMainScreen pageData={pageData}/>
        {pageData.isShowProtectionsDays && <FestivalProtections title={pageData.protectionsTitle} protectionsDays={protectionsDays}/>}
        <FestivalBusinessProgram pageData={pageData}/>
        <FestivalForum pageData={pageData}/>
      </div>

  );
};

export default Page;