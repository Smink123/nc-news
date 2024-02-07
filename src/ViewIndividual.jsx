import { useState, useEffect } from "react";
import { getArticles } from "./UTILS/utils";
import Expandable from "./Expandable";
import { Link } from "react-router-dom";

export default function ViewIndividual() {
  const [viewArticleTitles, setViewArticleTitles] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    getArticles()
      .then((response) => {
        setViewArticleTitles(response.articles);
        setButtonsVisible(true);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

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
