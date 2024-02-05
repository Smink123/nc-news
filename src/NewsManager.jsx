import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import AllArticles from "./AllArticles";
import "./CSS/news-manager.css";
import SingleArticle from "./SingleArticle";

export default function NewsManager() {
  const [searchResultsArticles, setSearchResultArticals] = useState([])
  return (
    <section id="main-body-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<AllArticles searchResultsArticles={searchResultsArticles} setSearchResultArticals={setSearchResultArticals}/>}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
      </Routes>
    </section>
  );
}
