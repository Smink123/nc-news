import { Route, Routes, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import AllArticles from "./AllArticles";
import "./CSS/news-manager.css";
import SingleArticle from "./SingleArticle";

export default function NewsManager() {
  const [searchResultsArticles, setSearchResultArticals] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <section id="main-body-container">
      <Navigation searchParams={searchParams} setSearchParams={setSearchParams}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<AllArticles searchResultsArticles={searchResultsArticles} setSearchResultArticals={setSearchResultArticals} searchParams={searchParams} setSearchParams={setSearchParams}/>}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
      </Routes>
    </section>
  );
}
