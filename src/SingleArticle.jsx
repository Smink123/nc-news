import { useParams } from "react-router-dom";
import { getArticleByID } from "./UTILS/utils";
import { useEffect, useState } from "react";
import "./CSS/single-article-container.css";

export default function SingleArticle() {
  const [articleData, setArticleData] = useState({});
  const { article_id } = useParams();

  useEffect(() => {
    getArticleByID(article_id)
      .then((response) => {
        setArticleData(response.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

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
            <p>Written by {articleData.author}</p>
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
          <button>Show comments</button>
        </div>
      </article>
    </section>
  );
}
