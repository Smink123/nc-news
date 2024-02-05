import { getArticles } from "./UTILS/utils";
import { useEffect } from "react";
import { useState } from "react";
import ArticlesList from "./ArticlesList";
import "./CSS/search-results-container.css";

export default function AllArticles({
  searchResultsArticles,
  setSearchResultArticals,
}) {
  const [viewResults, setViewResults] = useState(false);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setSearchResultArticals(response.articles);
        setViewResults(true);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);
  if (viewResults)
    return (
      <>
        <main>
          <p id="total-amount-num">
            Total articles: {searchResultsArticles.total_count}
          </p>
          <ArticlesList searchResultsArticles={searchResultsArticles} />
        </main>
      </>
    );
}
