import React, {useEffect} from 'react';
import {Route, Routes} from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import {createYear} from "./utils/date";
import News from "./pages/News";
import NewsArticle from "./pages/news-article/NewsArticle";
import axios from "axios";
import Festival from "./pages/Festival";

function App() {
  useEffect(() => {
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={"news"} element={<News/>}/>
        <Route path={"news/:slug"} element={<NewsArticle/>}/>
        <Route path={"festival"} element={<Festival/>}/>
      </Route>
    </Routes>
  );
}

export default App;
