import React, {useEffect} from 'react';
import FestivalMainScreen from "../components/_festival/festival-main-screen/FestivalMainScreen";
import pagesData from "../store/pagesData";
import {observer} from "mobx-react-lite";
import FestivalPremiya from "../components/_festival/festival-premiya/FestivalPremiya";
import FestivalPrice from "../components/_festival/festival-price/FestivalPrice";
import FestivalDate from "../components/_festival/festival-date/FestivalDate";
import FestivalBid from "../components/_festival/festival-bid/FestivalBid";
import {useSearchParams} from "react-router-dom";
import FestivalDocuments from "../components/_festival/festival-documents/FestivalDocuments";
import FestivalEmails from "../components/_festival/festival-emails/FestivalEmails";
import FestivalDiploma from "../components/_festival/festival-diploma/FestivalDiploma";

const Festival = () => {
  const {festivalText, fetchFestivalText}=pagesData
  const [searchParams, setSearchParams] = useSearchParams()
  const view= (searchParams.get("view")=="draft" && searchParams.get("preview-secret")===process.env.REACT_APP_PREVIEW)?"DRAFT":"PUBLISHED"
  useEffect(() => {
    if (!festivalText)
      fetchFestivalText(view)
  }, []);
  return (
      <>
        {
          festivalText ?
              <div>
                <FestivalMainScreen/>
                <FestivalPremiya/>
                <FestivalPrice/>
                <FestivalDate/>
                <FestivalBid/>
                <FestivalDocuments/>
                <FestivalEmails/>
                <FestivalDiploma/>
              </div>
              :
              <div></div>
        }
      </>
  );
};

export default observer(Festival);
