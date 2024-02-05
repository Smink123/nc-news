import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import SearchResults from "./SearchResults";
import "./CSS/news-manager.css";

export default function NewsManager() {
  const [searchResultsArticles, setSearchResultArticals] = useState([])
  return (
    <section id="main-body-container">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<SearchResults searchResultsArticles={searchResultsArticles} setSearchResultArticals={setSearchResultArticals}/>}></Route>
      </Routes>
    </section>
  );
}
