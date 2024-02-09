import { useState } from "react";
import "./CSS/homepage-container.css";
import "./CSS/article-container.css";
import "./CSS/app.css"
import { Link } from "react-router-dom";
import { arrangeDate } from "./UTILS/changeTime";
import { arrangeTime } from "./UTILS/changeTime";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect } from "react";
import "./CSS/article-container.css";
import { getArticleByID } from "./UTILS/utils";
import { CircularProgress } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';


export default function Home() {
  const [loadingIndividualHome, setLoadingIndividualHome] = useState(false);
  const [spotlightArticle, setSpotlightArticle] = useState({});
  const [invalidID, setInvalidID] = useState(false);

  useEffect(() => {
    const randomNum = 4;
    setLoadingIndividualHome(true);
    getArticleByID(randomNum)
      .then((response) => {
        setLoadingIndividualHome(false);
        setSpotlightArticle({ ...response.article });
      })
      .catch((err) => {
        setLoadingIndividualHome(false);
        if (
          err.response.data.msg === "Bad request" ||
          err.response.data.msg === "ID not found"
        ) {
          setInvalidID(true);
        }
      });
  }, []);

  if (invalidID)
    return (
      <section id="non-existent-id-container">
        <h2 className="website-greet">Welcome to NC News</h2>
        <p className="error">Cannot load spotlight content</p>
      </section>
    );
  if (loadingIndividualHome) return  (
    <div className="loading-container">
      <CircularProgress color="inherit" size={100}/>
    </div>
  )
  return (
    <section id="homepage-container">
      <h2 className="website-greet">Welcome to NC News</h2>
      <p id='spotlight-intro'>Checkout our spotlight article:</p>
      {spotlightArticle && (
        // <section id="spotlight-article">
          <div id="article-container" key={spotlightArticle.article_id}>
            <section id="article-top">
              <h3 id="article-header">{spotlightArticle.title}</h3>
              <p id="all-articles-author">{<CreateIcon fontSize="small"/>}By {spotlightArticle.author}</p>
              <div id="article-top-two">
                <p>
                  {arrangeDate(spotlightArticle.created_at)},{" "}
                  {arrangeTime(spotlightArticle.created_at)}
                </p>
              </div>
            </section>
            <img
              id="all-img"
              src={spotlightArticle.article_img_url}
              alt={`Image for ${spotlightArticle.topic}`}
            />
            <div id="article-bottom">
              <div id="emoji-container">
                <p>
                  {<ChatBubbleOutlineIcon />}
                  {spotlightArticle.comment_count}
                </p>
                {spotlightArticle.votes >= 0 && (
                  <p>
                    {<ArrowUpwardIcon />}
                    {spotlightArticle.votes}
                  </p>
                )}
                {spotlightArticle.votes < 0 && (
                  <p>
                    {<ArrowDownwardIcon />} {spotlightArticle.votes}
                  </p>
                )}
              </div>
              <Link to={`/articles/${spotlightArticle.article_id}`}>
                <button id="all-page-view-more">View Article</button>
              </Link>
            </div>
          </div>
        // </section>
      )}
    </section>
  );
}
