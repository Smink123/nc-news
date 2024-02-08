import { useState, useEffect } from "react";
import { getArticles } from "./UTILS/utils";
import Expandable from "./Expandable";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";



export default function ViewIndividual() {
  const [viewArticleTitles, setViewArticleTitles] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false)


  useEffect(() => {
    setLoadingArticle(true)
    getArticles()
      .then((response) => {
        setViewArticleTitles(response.articles);
        setLoadingArticle(false)
        setButtonsVisible(true);
      })
      .catch((err) => {
        setLoadingArticle(false)
      });
  }, []);

  if (loadingArticle) return (
    <div id='topics-loading'>
      <CircularProgress color="inherit" size={50} />
    </div>
  )
  return (
    <>
      <Expandable contentDescriptor={"Individual Articles"}>
        {buttonsVisible && (
          <>
            {viewArticleTitles.result.map((article) => (
              <Link
                to={`/articles/${article.article_id}`}
                key={article.article_id}>
                <button className="dropdown-button">{article.title}</button>
              </Link>
            ))}
          </>
        )}
      </Expandable>
    </>
  );
}
