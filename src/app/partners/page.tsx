import React from 'react';
import PartnersMainScreen from "@/components/_partners/partners-main-screen/PartnersMainScreen";
import type {Metadata} from "next";
import {domain} from "@/variables";
import {revalidateTag, unstable_cache} from "next/cache";
import {fetchSingle} from "@/utils/strapFetch";
import {IPartners} from "@/types/data";
import PartnersSlider from "@/components/partners-slider/PartnersSlider";
import PartnersClub from "@/components/_partners/partners-club/PartnersClub";
import PartnersContacts from "@/components/_partners/partners-contacts/PartnersContacts";
import Life from "@/components/life/Life";
import PartnersEvents from "@/components/_partners/partners-events/PartnersEvents";
import InfopartnersSlider from '@/components/partners-slider/infopartners/InfopartnersSlider';

interface Props{
  searchParams: { [key: string]: string | string[] | undefined }
}

const init=unstable_cache(async ()=>{
  const data=await fetchSingle<IPartners>("partners")
  return data
}, ["partners-page"], {tags: ["partners"]})

const MyComponent = async ({searchParams}: Props) => {
  const pageData= await init()

  if (typeof pageData==="string" || !pageData) {
    revalidateTag("partners")
    return <div>произошла ошибка{pageData && `: ${pageData}`}, перезагрузите страницу</div>
  }

  return (
      <>
        <PartnersMainScreen pageData={pageData}/>
        <PartnersClub pageData={pageData}/>
        <PartnersContacts pageData={pageData}/>
        <Life title={pageData.lifeTitle} signatures={pageData.lifeSignatures} life={pageData.life}/>
        {pageData.isShowInfopartners && <InfopartnersSlider
          infopartners={pageData.infopartners}
          infopartnersTitle={pageData.infopartnersTitle}
          infopartnersText={pageData.infopartnersText}
        />}
        {pageData.isShowEvents && <PartnersEvents pageData={pageData}/>}
        {pageData.isShowPartners && 
          <div style={{background:"#fff", overflow:"hidden"}}>
            <PartnersSlider/>
          </div>
        }
      </>
  );
};

export const metadata: Metadata = {
  title: "АЛАРОС | Партнеры",
  alternates:{
    canonical: `${domain}/partners`
  }
};

export const dynamic = "force-dynamic"

export default MyComponent;
