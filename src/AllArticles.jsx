import { getArticles } from "./UTILS/utils";
import { useEffect } from "react";
import { useState } from "react";
import ArticlesList from "./ArticlesList";
import "./CSS/search-results-container.css";
import { capitalise } from "./UTILS/capitalise";

export default function AllArticles({
  searchResultsArticles,
  setSearchResultArticals,
  searchParams,
  setSearchParams,
}) {
  const [viewResults, setViewResults] = useState(false);
  const topicName = searchParams.get("topic");
  const [queryError, setQueryError] = useState(false);

  useEffect(() => {
    getArticles(topicName)
      .then((response) => {
        setSearchResultArticals(response.articles);
        setViewResults(true);
      })
      .catch((err) => {
        console.log("error: ", err);
        if (err.response.data.msg === "Bad request: query does not exist") {
          setQueryError(true);
        }
      });
  }, [topicName]);

  if (queryError)
    return (
      <div id='error-container'>
        <p id="query-error">
          Looks as though we don't have anything for that topic (yet)
        </p>
      </div>
    );
  if (viewResults)
    return (
      <>
        <main>
          {topicName ? (
            <h3 className="page-title">{capitalise(topicName)}</h3>
          ) : (
            <h3 className="page-title">All Articles</h3>
          )}
          <p id="total-amount-num">
            Total articles: {searchResultsArticles.total_count}
          </p>
          <ArticlesList searchResultsArticles={searchResultsArticles} />
        </main>
      </>
    );
}
