import { Route, Routes, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Navigation from "./Navigation";
import AllArticles from "./AllArticles";
import NonExistent from "./NonExistent";
import "./CSS/news-manager.css";
import SingleArticle from "./SingleArticle";


export default function NewsManager() {
  const [searchResultsArticles, setSearchResultArticals] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const [topicSearchTerm, setTopicSearchTerm] = useSearchParams()


  function setTopicQuery(topic) {
    const newTopic = new URLSearchParams(topicSearchTerm);
    newTopic.set("topic", topic);
    setTopicSearchTerm(newTopic);
  }

  return (
    <section id="main-body-container">
      <Navigation searchParams={searchParams} setSearchParams={setSearchParams} setTopicQuery={setTopicQuery}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NonExistent />}></Route>
        <Route path="/articles" element={<AllArticles searchResultsArticles={searchResultsArticles} setSearchResultArticals={setSearchResultArticals} searchParams={searchParams} setTopicQuery={setTopicQuery}/>}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle/>}></Route>
      </Routes>
    </section>
  );
}
