'use client'
import React, {useEffect, useMemo, useState} from 'react';
import "./festival-templates.scss"
import {IFestival, IFestivalNomination} from "@/types/data";
import {getBtns} from "@/utils/getBtns";
import Detalis from "@/components/detalis/Detalis";
import HtmlProcessing from "@/components/HtmlProcessing";
import Dropdown from "@/components/dropdown/Dropdown";
import {useMediaQuery} from "react-responsive";

interface Props{
  pageData: IFestival
}

const FestivalTemplates = ({pageData}:Props) => {
  const [value, setValue] = useState(pageData.nominations[0].number.toString())
  const values = pageData.nominations.map(nomination=> nomination.number.toString())
  const curenrItem=useMemo(()=>(
      pageData.nominations.find(item=>item.number.toString()==value)
  ), [value])

  return (
      <div className="festival-templates">
        <Detalis
            disabled={pageData.templatesDisabled}
            title={<span>{pageData.templates.left}</span>}
            rightElement={pageData.templates.right}
            isBtnBg
        >
          <HtmlProcessing html={`<span class="festival-templates__subtitle">${pageData.templates.right}</span>`}/>
          <div className="festival-templates__content">
            <Dropdown id={'templates'} value={value} values={values} handleCheck={e => {setValue(e.target.value)}} nominations={pageData.nominations} arrow={true}/>

            <a href={`${process.env.NEXT_PUBLIC_IMAGES_URL}${curenrItem?.file?.url}`} className={(!curenrItem || !curenrItem.file)? 'festival-templates__link-disabled':''} download><HtmlProcessing html={pageData.templatesDownload}/></a>
          </div>
        </Detalis>
      </div>
  );
};

export default FestivalTemplates;
