import React, {useEffect, useState} from 'react';
import NewsMainScreen from "../components/_news/news-main-screen/NewsMainScreen";
import pagesData from "../store/pagesData";
import {useSearchParams} from "react-router-dom";
import NewsList from "../components/_news/news-list/NewsList";
import {observer} from "mobx-react-lite";

const News = () => {
  const {newsPages,fetchNewsPage}=pagesData
  const [searchParams, setSearchParams] = useSearchParams()
  const page= searchParams.get("page")?Number(searchParams.get("page")) :1

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  useEffect(() => {
    console.log(page)
    fetchNewsPage(page)
  }, [page]);

  return (
      <div>
        <NewsMainScreen/>
        <NewsList news={newsPages[page]}/>
      </div>
  );
};

export default observer(News);
