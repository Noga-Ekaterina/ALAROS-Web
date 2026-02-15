import React from 'react';
import {IContacts} from "@/types/data";
import {revalidateTag, unstable_cache} from "next/cache";
import AnimationPage from "@/app/AnimationPage";
import type {Metadata} from "next";
import ContactsMainScreen from "@/components/_contacts/contacts-main-screen/ContactsMainScreen";
import ContactsAddressesSocials from "@/components/_contacts/contacts-addresses-socials/ContactsAddressesSocials";
import ContactsForm from "@/components/_contacts/contacts-form/ContactsForm";
import { fetchSingle } from '@/utils/strapFetch';

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init= unstable_cache(async ()=>{
  const data= await fetchSingle<IContacts>("contacts")
  return data

  }, ["contacts-page"], {tags: ["contacts", "input"]})

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
