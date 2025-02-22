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
import FestivalProtections from "../../components/_festival/festival-protections/FestivalProtections";
import FestivalProjects from "../../components/_festival/festival-projects/FestivalProjects";
import FestivalBusinessProgram from "../../components/_festival/festival-business-program/FestivalBusinessProgram";
import FestivalForum from "../../components/_festival/festival-forum/FestivalForum";
import {fetchData} from "@/utils/fetchData";
import {IFestival, IHtmlString, IJury, IProtectionsDay} from "@/types/data";
import {unstable_cache} from "next/cache";
import {nominationsSProcessing} from "@/utils/nominationsProcessing";
import ProjectModal from "@/components/_projects/project-modal/ProjectModal";

interface IData{
  festivalS: IFestival[]
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
            festivalS {
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
              protectionsTitle
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

  const {festivalS, juries, protectionsDays, nominationsS}=data

  const result= {festivalText: festivalS[0], juries, protectionsDays, nominations: nominationsSProcessing(nominationsS[0].nominations.html)}


  return result
},
    ["festival"], {tags: ["festival"]})

const Page = async ({searchParams}:Props) => {
  const {preview}=searchParams
  const data=  await init()

  if (!data) return <div>произошла ошибка, перезагрузите страницу</div>

  const {festivalText, juries, protectionsDays, nominations}= data
  return (
      <div>
        <ProjectModal projects={festivalText.projects} searchParams={searchParams}/>
        <FestivalMainScreen festivalText={festivalText}/>
        <FestivalPremiya festivalText={festivalText}/>
        <FestivalPrice festivalText={festivalText}/>
        <FestivalDate festivalText={festivalText}/>
        <FestivalBid festivalText={festivalText} nominations={nominations}/>
        <FestivalDocuments festivalText={festivalText} nominations={nominations}/>
        <FestivalEmails festivalText={festivalText}/>
        <FestivalDiploma festivalText={festivalText} nominations={nominations}/>
        <FestivalJuries title={festivalText.juriesTitle} juries={juries}/>
        <FestivalProtections title={festivalText.protectionsTitle} protectionsDays={protectionsDays}/>
        <FestivalProjects festivalText={festivalText}/>
        <FestivalBusinessProgram festivalText={festivalText}/>
        <FestivalForum festivalText={festivalText}/>
      </div>

  );
};

export default Page;