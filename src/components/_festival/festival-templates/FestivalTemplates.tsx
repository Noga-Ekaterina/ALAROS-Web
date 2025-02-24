'use client'
import React, {useEffect, useState} from 'react';
import "./festival-templates.scss"
import {IFestival, INomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import Detalis from "@/components/detalis/Detalis";
import HtmlProcessing from "@/components/HtmlProcessing";
import Dropdown from "@/components/dropdown/Dropdown";
import {useMediaQuery} from "react-responsive";

interface Props{
  pageData: IFestival
  nominations: INomination[]
}

const FestivalTemplates = ({pageData, nominations}:Props) => {
  const [btn]= getBtns([pageData.templates])
  const [value, setValue] = useState(nominations[0].value)
  const values = nominations.map(nomination=> nomination.value)
  const mobileScreen = useMediaQuery({maxWidth: 660});
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
      <div className="festival-templates">
        <Detalis
            title={<HtmlProcessing html={btn.title}/>}
            rightElement={<HtmlProcessing html={`<span class="festival-templates__btn">${isClient? mobileScreen ? "<span>[</span><span class='festival-main-templates__icon'>+</span><span>]</span>":btn.link:btn.link}</span>`}/>}
        >
          <HtmlProcessing html={`<span class="festival-templates__subtitle">${btn.link}</span>`}/>
          <div className="festival-templates__content">
            <Dropdown id={'templates'} value={value} values={values} handleCheck={e => {
              setValue(e.target.value)
              console.log(e.target.value)
            }} nominations={nominations} arrow={true}/>

            <a href={nominations.find(item=>item.value==value)?.link} download><HtmlProcessing html={pageData.templatesDownload.html}/></a>
          </div>
        </Detalis>
      </div>
  );
};

export default FestivalTemplates;
