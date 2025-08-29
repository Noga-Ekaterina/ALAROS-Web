import React from 'react';
import {IContacts} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchData} from "@/utils/fetchData";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import ContactsMainScreen from "@/components/_contacts/contacts-main-screen/ContactsMainScreen";
import ContactsAddressesSocials from "@/components/_contacts/contacts-addresses-socials/ContactsAddressesSocials";
import ContactsForm from "@/components/_contacts/contacts-form/ContactsForm";

interface IData{
  contactss: IContacts[]
}

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchData<IData>(`
    query MyQuery {
      contactss {
        title
        addressesColumns {
          html
        }
        images
        contactsColumns {
          html
        }
        mapCoordinates {
          latitude
          longitude
        }
        formTitle
        formInputs {
          placeholder
          clue
          type
          necessarily
          emailType
          maxValue
        }
        socialsIcons {
          html
        }
      }
    }
  `)

  if (typeof data==="string"){
    return data
  }

  return data? data.contactss[0] : null

  }, ["contacts-page"], {tags: ["Contacts", "FormInput"]})

const Page = async ({searchParams}:Props) => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("CompetitionResults")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <AnimationPage>
        <ContactsMainScreen data={pageData}/>
        <ContactsAddressesSocials data={pageData}/>
        <ContactsForm title={pageData.formTitle} inputs={pageData.formInputs}/>
      </AnimationPage>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Контакты",
};

export const dynamic = 'force-dynamic';

export default Page;
