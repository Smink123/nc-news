import { getArticles } from "./UTILS/utils";
import { useEffect } from "react";
import { useState } from "react";
import ArticlesList from "./ArticlesList";
import { capitalise } from "./UTILS/capitalise";
import SortManager from "./SortManager";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import "./CSS/search-results-container.css";
import "./CSS/app.css"

export default function AllArticles({
  searchResultsArticles,
  setSearchResultArticals,
  searchParams,
  setTopicQuery,
}) {
  const [viewResults, setViewResults] = useState(false);
  const [queryError, setQueryError] = useState(false);
  const [loadArticles, setLoadArticles] = useState(false);
  const [sortByTerm, setSortByTerm] = useSearchParams();
  const [orderByTerm, setOrderByTerm] = useSearchParams();

  const setSortBy = (sort_by) => {
    const newSortBy = new URLSearchParams(sortByTerm);
    newSortBy.set("sort_by", sort_by);
    setSortByTerm(newSortBy);
  };

  const setOrderBy = (order) => {
    const newOrderBy = new URLSearchParams(orderByTerm);
    newOrderBy.set("order", order);
    setOrderByTerm(newOrderBy);
  };

  const topicName = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by");
  const orderBy = searchParams.get("order");

  useEffect(() => {
    setLoadArticles(true);
    getArticles(topicName, sortBy, orderBy)
      .then((response) => {
        setSearchResultArticals(response.articles);
        setViewResults(true);
        setLoadArticles(false);
      })
      .catch((err) => {
        setLoadArticles(false);
        if (err.response.data.msg === "Bad request: query does not exist") {
          setQueryError(true);
        }
      });
  }, [topicName, sortBy, orderBy]);

  if (queryError)
    return (
      <section id="error-container">
        <p id="query-error" className="error">Looks as though we don't have anything for that query...(yet)<CloseIcon/></p>
      </section>
    );

    if ((loadArticles && !topicName && !orderBy && !sortBy) || (loadArticles && topicName && !orderBy && !sortBy)) return (
      <div className="loading-container">
         <CircularProgress color="inherit" size={100}/>
      </div>
      )

  if (viewResults)
    return (
      <>
        <main>
          <SortManager
            setSortBy={setSortBy}
            setOrderBy={setOrderBy}
            setOrderByTerm={setOrderByTerm}
            orderByTerm={orderByTerm}
            orderBy={orderBy}
            sortBy={sortBy}
          />
          {topicName ? (
            <h3 className="page-title">{capitalise(topicName)}</h3>
          ) : (
            <h3 className="page-title">All Articles</h3>
          )}

          {/* <p id="total-amount-num">
            Total articles: {searchResultsArticles.total_count}
          </p> */}
          <ArticlesList
            searchResultsArticles={searchResultsArticles}
            setTopicQuery={setTopicQuery}
            loadArticles={loadArticles}
          />
        </main>
      </>
    );
}
