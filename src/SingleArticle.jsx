import { useParams } from "react-router-dom";
import { getArticleByID } from "./UTILS/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import "./CSS/single-article-container.css";
import Expandable from "./Expandable";

export default function SingleArticle() {
  const [articleData, setArticleData] = useState({});
  const [articleID, setArticleID] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    getArticleByID(article_id)
      .then((response) => {
        setArticleData(response.article);
        setArticleID(response.article.article_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id, articleID]);

  function arrangeDate(timeString) {
    if (timeString) {
      const timeArray = timeString.split("T");
      return timeArray[0];
    }
    return "";
  }
  function arrangeTime(timeString) {
    if (timeString) {
      const timeArray = timeString.split("T");
      const time = timeArray[1];
      const trimmedTime = time.substring(0, 5);
      return trimmedTime;
    }
    return "";
  }

  return (
    <section id="single-article-page">
      <article id="single-container">
        <h2>{articleData.title}</h2>
        <div id="top-single-article">
          <section>
            <b>Written by {articleData.author}</b>
            <p>
              Created {arrangeDate(articleData.created_at)},{" "}
              {arrangeTime(articleData.created_at)}
            </p>
          </section>
          <p className="italic">Topic: {articleData.topic}</p>
        </div>
        <img
          id="single-img"
          src={articleData.article_img_url}
          alt={`photographic image for ${articleData.title} article`}
        />
        <section>
          <p>{articleData.body}</p>
        </section>
        <div id="votes-container">
          <button>↑</button>
          <p>Votes: {articleData.votes}</p>
          <button>↓</button>
        </div>
        <div id="comments-top">
          <p>Comments: {articleData.comment_count}</p>
        <Expandable contentDescriptor={"comments"}>
          <Comments articleID={articleID} />
        </Expandable>
        </div>
      </article>
    </section>
  );
}
