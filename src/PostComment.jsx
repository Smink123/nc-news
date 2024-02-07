import { postComment } from "./UTILS/utils";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useContext } from "react";
import { useState } from "react";
import { getCommentsByID } from "./UTILS/utils";
import { getArticleByID } from "./UTILS/utils";


import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';


export default function PostComment({
  articleID,
  setArticleComments,
  setArticleData,
}) {
  const { currentUser } = useContext(UsernameContext);
  // const [commentPosted, setCommentPosted] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [errorStatus, setErrorStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userComment, setUserComment] = useState({
    body: "",
    username: currentUser.username,
  });

  function handleSubmit(event) {
    setErrorStatus(false);
    // setCommentPosted(false);
    event.preventDefault();
    setIsLoading(true);
    postComment(userComment, articleID)
    .then(() => {
      setUserComment({
        body: "",
        username: currentUser.username,
      });
      setOpen(true);
      // alert('comment succssfully posted')
        // setCommentPosted(true);
        setErrorStatus(false);
        setIsLoading(false);
        getCommentsByID(articleID).then((response) => {
          setArticleComments(response.comments);

          getArticleByID(articleID).then((response) => {
            setArticleData(response.article);
          });
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // setCommentPosted(false);
        setErrorStatus(true);
        setUserComment({
          body: "",
          username: currentUser.username,
        });
      });
  }

  function handleKeyPress(event) {
    setUserComment((previousState) => {
      return { ...previousState, body: event.target.value };
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  return (
    <>
      <form onSubmit={handleSubmit}>


        <div id="comment-box">
          <label htmlFor="post-comment">Write comment: </label>
          <input onChange={handleKeyPress} id="post-comment" type="text" value={userComment.body} />
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
          {errorStatus ? (
            <aside className="error">
              Error: Please ensure your comment has a length greater than 0.
            </aside>
          ) : null}
          {/* {commentPosted ? (
            <aside className="success">
              ✓ your comment has been successfully posted
            </aside>
          ) : null} */}
        </div>
        {isLoading ? <p>loading...</p> : null}
      </div>
    </>
  );
}