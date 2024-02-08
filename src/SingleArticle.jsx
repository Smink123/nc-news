import { useParams } from "react-router-dom";
import { getArticleByID } from "./UTILS/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Expandable from "./Expandable";
import { patchArticleVote } from "./UTILS/utils";
import { arrangeDate, arrangeTime } from "./UTILS/changeTime";
import "./CSS/single-article-container.css";

export default function SingleArticle() {
  const [articleData, setArticleData] = useState({});
  const [articleID, setArticleID] = useState(null);
  const [errMessage, setErrorMessage] = useState(null);
  const [invalidID, setInvalidID] = useState(false);
  const [loadingIndividual, setLoadingIndividual] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setLoadingIndividual(true);
    getArticleByID(article_id)
      .then((response) => {
        setLoadingIndividual(false);

        setArticleData({ ...response.article, voted: false });
        setArticleID(response.article.article_id);
      })
      .catch((err) => {
        setLoadingIndividual(false);
        if (err.response.data.msg === 'Bad request' || err.response.data.msg === 'ID not found') {
          setInvalidID(true);
        }
      });
  }, [article_id, articleID]);

  function updateVote(id, number) {
    setArticleData((previousData) => {
      return {
        ...previousData,
        votes: previousData.votes + number,
        voted: true,
      };
    });
    patchArticleVote({ inc_votes: number }, id)
      .then((response) => {
        setErrorMessage(null);
      })
      .catch((err) => {
        setArticleData((previousData) => {
          return {
            ...previousData,
            votes: previousData.votes - number,
            voted: false,
          };
        });
        setErrorMessage("Cannot add votes at this time.");
      });
  }
  if (invalidID)
    return (
      <section id="non-existent-id-container">
        <p>Article does not exist</p>
      </section>
    );
  if (loadingIndividual) return <p>Loading article...</p>;
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
          {!articleData.voted && (
            <button onClick={() => updateVote(articleData.article_id, 1)}>
              ↑
            </button>
          )}
          <p>Votes: {articleData.votes}</p>
          {!articleData.voted && (
            <button onClick={() => updateVote(articleData.article_id, -1)}>
              ↓
            </button>
          )}
        </div>
        {articleData.voted && (
          <aside className="success" role="status">
            Vote submitted!
          </aside>
        )}
        {errMessage ? (
          <aside className="error" role="alert">
            {errMessage}
          </aside>
        ) : null}
        <div id="comments-top">
          <p>Comments: {articleData.comment_count}</p>
          <Expandable contentDescriptor={"comments"}>
            <Comments articleID={articleID} setArticleData={setArticleData} />
          </Expandable>
        </div>
      </article>
    </section>
  );
}
