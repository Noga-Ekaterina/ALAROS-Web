import React from 'react';
import {Route, Routes} from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import {createYear} from "./utils/date";
import News from "./pages/News";

function App() {
  console.log(createYear({monthNumber:2}).createYearMonthes())
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path={"news"} element={<News/>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
