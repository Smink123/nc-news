

import React, { useEffect, useState } from "react";
import { getCommentsByID } from "./UTILS/utils";
import PostComment from "./PostComment";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useContext } from "react";
import "./CSS/comments.css";
import "./CSS/app.css";
import { deleteComment } from "./UTILS/utils";
import { arrangeDate, arrangeTime } from "./UTILS/changeTime";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


export default function Comments({ articleID, setArticleData }) {
  const { currentUser } = useContext(UsernameContext);
  const [articleComments, setArticleComments] = useState([]);
  const [commentsError, setCommentsError] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    setLoadingComments(true)
    setCommentsError(false)
    if (articleID) {
      getCommentsByID(articleID)
        .then((response) => {
          setLoadingComments(false)
          setArticleComments(response.comments);
          setArticleComments(
            response.comments.map((comment) => ({
              ...comment,
              loadingDelete: false,
              deleteError: false,
              systemError: false
            }))
          );
        })
        .catch((err) => {
          setLoadingComments(true)
          if (err.response.data.msg === 'Bad request' || err.response.data.msg === 'ID not found') {
            setCommentsError(true)
          }
        });
    }
  }, [articleID]);

  function deleting(id) {
    setArticleComments((previous) => {
      return previous.map((comment) => {
        if (id === comment.comment_id) {
          return { ...comment, loadingDelete: true, deleteError: false, systemError: false };
        }
        return comment;
      });
    });
    deleteComment(id)
      .then(() => {
        setOpen(true);
        setArticleComments(
          articleComments.filter((item) => item.comment_id !== id)
        );
        setArticleData((previous) => {
          return { ...previous, comment_count: previous.comment_count - 1 };
        });
      })
      .catch((err) => {
        setArticleComments((previous) => {
          return previous.map((comment) => {
            if (id === comment.comment_id) {
              return { ...comment, loadingDelete: false, deleteError: true, systemError: true };
            }
            return comment;
          });
        });
      });
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (commentsError) return <p>Error retrieving comments for this article</p>

  if (loadingComments)
  return (
    <div className="loading-container" id='comments-loading'>
      <CircularProgress color="inherit" size={100} />
    </div>
  );


  return (
    <>
      {articleComments.map((comment) => (
        <section key={comment.comment_id} id="individual-comment-container">
          <p id='full-article-name'>{comment.author}</p>
          <p className="italic" id='comments-date'>
            {arrangeDate(comment.created_at)}, {arrangeTime(comment.created_at)}
          </p>
          <hr></hr>
          <p>"{comment.body}"</p>
          <div id="comment-button-container">
            <button>{<ArrowUpwardIcon/>}</button>
            <p>{comment.votes}</p>
            <button>{<ArrowDownwardIcon/>}</button>
          </div>
          {comment.author === currentUser.username &&
            !comment.loadingDelete && (
              <>
                <button onClick={() => deleting(comment.comment_id)}>
                  {<DeleteOutlineIcon/>}
                </button>
                <Snackbar
                  open={open}
                  autoHideDuration={4000}
                  onClose={handleClose}
                  message="Successfully deleted"
                />
              </>
            )}
          {comment.loadingDelete && <CircularProgress id='loading'color="inherit" />}
          {comment.deleteError && (
            <aside className="dark-error">
              delete unsuccessful. Please try again
            </aside>
          )}
        </section>
      ))}
      <PostComment
        articleID={articleID}
        setArticleComments={setArticleComments}
        setArticleData={setArticleData}
      />
    </>
  );
}
