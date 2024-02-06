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
  const [articleComments, setArticleComments] = useState([]);


  const { article_id } = useParams();

  useEffect(() => {
    getArticleByID(article_id)
      .then((response) => {
        setArticleData({...response.article, voted: false});
        setArticleID(response.article.article_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id, articleID, articleComments]);

  function updateVote(id, number) {
    setArticleData((previousData) => {
      return { ...previousData, votes: previousData.votes + number, voted: true }
    })
    patchArticleVote({ inc_votes: number }, id).then((response) => {
      setErrorMessage(null);

    })
    .catch((err) => {
      console.log(err)
      setArticleData((previousData) => {
        return { ...previousData, votes: previousData.votes - number, voted: false }
      })
      setErrorMessage("Cannot add votes at this time.");
    })
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
          {!articleData.voted && (
            <button onClick={() => updateVote(articleData.article_id, 1)}>↑</button>
          )}
          <p>Votes: {articleData.votes}</p>
          {!articleData.voted && (
          <button onClick={() => updateVote(articleData.article_id, -1)}>↓</button>
          )}
        </div>
        <b>Comments: {articleData.comment_count}</b>
        {articleData.voted && <aside className='success' role="status">Vote submitted!</aside>}
        {errMessage ? <aside className='error' role="alert">{errMessage}</aside> : null}
        <div id="comments-top">
        {/* <Expandable contentDescriptor={"comments"}> */}
          <Comments articleID={articleID} setArticleData={setArticleData} articleComments={articleComments} setArticleComments={setArticleComments} />
        {/* </Expandable> */}
        </div>
      </article>
    </section>
  );
}
