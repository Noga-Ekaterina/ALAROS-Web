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
import FestivalProtections from "@/components/_festival-to-people/festival-protections/FestivalProtections";
import FestivalProjects from "../../components/_festival/festival-projects/FestivalProjects";
import FestivalBusinessProgram from "@/components/_festival-to-people/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "@/components/_festival-to-people/festival-forum/FestivalForum";
import {fetchData} from "@/utils/fetchData";
import {IFestival, IHtmlString, IJury, IProtectionsDay} from "@/types/data";
import {unstable_cache} from "next/cache";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";

interface IData{
  festivalMains: IFestival[]
  juries: IJury[]
  protectionsDays: IProtectionsDay[]
  nominationsS: {
    nominations: IHtmlString
  }[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data: IData| null= await fetchData(`
          query FestivalQuery {
            festivalMains {
              stage
              mainScreenLeftSection {
                html
              }
              mainScreenSections {
                html
              }
              mainScreenPhoto
              premiyaTitle
              premiyaRightSignature{
                html
              }
              premiyaSteps {
                html
              }
              priceTitle
              priceTable {
                html
              }
              priceRunningLine{
                html
              }
              dateText {
                html
              }
              dateSections {
                html
              }
              bidTitle
              bidInputs(first: 100) {
                type
                placeholder
                values
                necessarily
              }
              bidButton
              bidNote {
                html
              }
              documentsTitle
              documentsLinks {
                html
              }
              templates {
                html
              }
              templatesDownload {
                html
              }
              emails{
                html
              }
              diplomaTitle
              diplomaInputs(first: 100) {
                placeholder
                type
                values
                necessarily
              }
              diplomaNote {
                html
              }
              juriesTitle
              projectsTitle
              projectsRightSignature{
                html
              }
              projects {
                name
                nomination
                number
                diploma
                year
                winner
                cover
                images
              }
            }
            juries {
              name
              place
              image
              jobTitle {
                html
              }
            }
            protectionsDays(orderBy: date_ASC) {
              date
              protections {
                html
              }
            }
            nominationsS {
              nominations {
                html
              }
            }
          }`)

  if (!data)
    return null

  const {festivalMains, juries, protectionsDays, nominationsS}=data

  const result= {pageData: festivalMains[0], juries, protectionsDays, nominations: nominationsSProcessing(nominationsS[0].nominations.html)}


  return result
},
    ["festival-main"], {tags: ["festival-main"]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (!data) return <div>произошла ошибка, перезагрузите страницу</div>

  const {pageData, juries, protectionsDays, nominations}= data
  return (
      <div>
        <ProjectModal projects={pageData.projects} searchParams={searchParams}/>
        <FestivalMainScreen pageData={pageData}/>
        <FestivalPremiya pageData={pageData}/>
        <FestivalPrice pageData={pageData}/>
        <FestivalDate pageData={pageData}/>
        <FestivalBid pageData={pageData} nominations={nominations}/>
        <FestivalDocuments pageData={pageData} nominations={nominations}/>
        <FestivalEmails pageData={pageData}/>
        <FestivalDiploma pageData={pageData} nominations={nominations}/>
        <FestivalJuries title={pageData.juriesTitle} juries={juries}/>
        <FestivalProjects pageData={pageData}/>
      </div>

  );
};

export default Page;