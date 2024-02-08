import { postComment } from "./UTILS/utils";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useContext } from "react";
import { useState } from "react";
import { getCommentsByID } from "./UTILS/utils";
import { getArticleByID } from "./UTILS/utils";
import { useEffect } from "react";

import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function PostComment({
  articleID,
  setArticleComments,
  setArticleData,
}) {
  const { currentUser } = useContext(UsernameContext);
  const [open, setOpen] = React.useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userComment, setUserComment] = useState({
    body: "",
    username: currentUser.username,
  });

  useEffect(() => {
    setErrorMessage("");
    setErrorStatus(false);
    setOpen(false)
  }, [articleID]);

  function handleSubmit(event) {
    event.preventDefault();
    if (userComment.body.length < 3) {
      setErrorMessage(
        "Error: Please ensure your comment has minimum of 2 characters"
      );
      setUserComment({
        body: "",
        username: currentUser.username,
      });
    } else {
      setIsLoading(true);
      postComment(userComment, articleID)
        .then(() => {
          setUserComment({
            body: "",
            username: currentUser.username,
          });
          setErrorStatus(false);
          setOpen(true);
          setIsLoading(false);
          getCommentsByID(articleID).then((response) => {
            setArticleComments(response.comments);
            getArticleByID(articleID).then((response) => {
              setArticleData(response.article);
            });
          });
        })
        .catch((err) => {
          setIsLoading(false);
          if (
            err.response.data.msg === "ID not found" ||
            err.response.data.msg === "Bad request"
          ) {
            setErrorStatus("Cannot submit comment to a non-existent article.");
          }
          if (err.response.data.msg === "username not found") {
            setErrorStatus(
              "Your username has not been found. Unable to post comment"
            );
          }
          setUserComment({
            body: "",
            username: currentUser.username,
          });
        });
    }
  }

  function handleKeyPress(event) {
    setUserComment((previousState) => {
      return { ...previousState, body: event.target.value };
    });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div id="comment-box">
          <label htmlFor="post-comment">Write comment: </label>
          <input
            onChange={handleKeyPress}
            id="post-comment"
            type="text"
            value={userComment.body}
          />
        </div>
        <div id="comment-submit-container">
          <button onClick={handleSubmit}>Submit comment</button>
          <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            message="Successfully posted"
          />
        </div>
      </form>
      <div id="status-section">
        <div>
          {errorMessage ? (
            <aside className="error">{errorMessage}</aside>
          ) : null}
        </div>
        <div>
          {errorStatus ? <aside className="error">{errorStatus}</aside> : null}
        </div>
        {isLoading ? <p>loading...</p> : null}
      </div>
    </>
  );
}
