
import { useParams } from "react-router-dom";
import { getArticleByID, patchArticleVote } from "./UTILS/utils";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import Expandable from "./Expandable";
import { arrangeDate, arrangeTime } from "./UTILS/changeTime";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./CSS/single-article-container.css";
import "./CSS/app.css"
import CreateIcon from '@mui/icons-material/Create';
import { CircularProgress } from "@mui/material";



export default function SingleArticle() {
  const [articleData, setArticleData] = useState({});
  const [articleID, setArticleID] = useState(null);
  const [errMessage, setErrorMessage] = useState(null);
  const [invalidID, setInvalidID] = useState(false);
  const [loadingIndividual, setLoadingIndividual] = useState(false);
  const [voted, setVoted] = useState(false);

  const { article_id } = useParams();

  useEffect(() => {
    setLoadingIndividual(true);
    getArticleByID(article_id)
      .then((response) => {
        setLoadingIndividual(false);
        setArticleData({ ...response.article});
        setArticleID(response.article.article_id);
        const votedStatus = sessionStorage.getItem(`voted_${article_id}`);
        setVoted(votedStatus === 'true');
      })
      .catch((err) => {
        setLoadingIndividual(false);
        if (err.response.data.msg === 'Bad request' || err.response.data.msg === 'ID not found') {
          setInvalidID(true);
        }
      });
  }, [article_id]);

  function updateVote(id, number) {
    setErrorMessage(null);
    setArticleData((previousData) => {
      return {
        ...previousData,
        votes: previousData.votes + number,
      };
    });
    setVoted(true);
    sessionStorage.setItem(`voted_${id}`, 'true');
    patchArticleVote({ inc_votes: number }, id)
      .then((response) => {
        setErrorMessage(null);
      })
      .catch((err) => {
        setArticleData((previousData) => {
          return {
            ...previousData,
            votes: previousData.votes - number,
          };
        });
        setVoted(false);
        sessionStorage.removeItem(`voted_${id}`);
        setErrorMessage("Cannot add votes at this time.");
      });
  }

  if (invalidID)
    return (
      <section id="non-existent-id-container">
        <p>Article does not exist</p>
      </section>
    );

    if (loadingIndividual) return  (
      <div className="loading-container">
        <CircularProgress color="inherit" size={100}/>
      </div>
    )
  // if (loadingIndividual) return <p>Loading article...bdb</p>;
  return (
    <section id="single-article-page">
      <article id="single-container">
        <h2 id='single-article-header'>{articleData.title}</h2>
        <div id="top-single-article">
          <section>
            <b>{<CreateIcon fontSize="small"/>}Written by {articleData.author}</b>
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
          {!voted && (
            <button onClick={() => updateVote(articleData.article_id, 1)}>
              {<ArrowUpwardIcon/>}
            </button>
          )}
          <p>Votes: {articleData.votes}</p>
          {!voted && (
            <button onClick={() => updateVote(articleData.article_id, -1)}>
              {<ArrowDownwardIcon/>}
            </button>
          )}
        </div>
        {voted && (
          <aside className="success vote-status" role="status">
            Vote submitted!
          </aside>
        )}
        {errMessage ? (
          <aside className="error vote-status" role="alert">
            {errMessage}
          </aside>
        ) : null}
        <div id="comments-top">
          <p>Comments: {articleData.comment_count}</p>
          <Expandable contentDescriptor={" latest comments"}>
            <Comments articleID={articleID} setArticleData={setArticleData} />
          </Expandable>
        </div>
      </article>
    </section>
  );
}
