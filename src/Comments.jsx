import React, { useEffect, useState } from "react";
import { getCommentsByID } from "./UTILS/utils";
import PostComment from "./PostComment";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useContext } from "react";
import "./CSS/comments.css";
import { deleteComment } from "./UTILS/utils";
import { arrangeDate, arrangeTime } from "./UTILS/changeTime";

export default function Comments({ articleID, setArticleData }) {
  const { currentUser } = useContext(UsernameContext);
  const [articleComments, setArticleComments] = useState([]);
  const [successDelete, setSuccessDelete] = useState(false);

  useEffect(() => {
    if (articleID) {
      getCommentsByID(articleID)
        .then((response) => {
          setArticleComments(response.comments);
          setArticleComments(
            response.comments.map((comment) => ({
              ...comment,
              loadingDelete: false,
              deleteError: false,
            }))
          );
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [articleID]);

  function deleting(id) {
    setArticleComments((previous) => {
      return previous.map((comment) => {
        if (id === comment.comment_id) {
          return { ...comment, loadingDelete: true, deleteError: false };
        }
        return comment;
      });
    });
    setSuccessDelete(false);
    deleteComment(id).then(() => {
        setSuccessDelete(true);
        setArticleComments(
          articleComments.filter((item) => item.comment_id !== id)
        );
        setArticleData((previous) => {
          return { ...previous, comment_count: previous.comment_count - 1 };
        });
      })
      .catch((err) => {
        console.log(err);
        setArticleComments((previous) => {
          return previous.map((comment) => {
            if (id === comment.comment_id) {
              return { ...comment, loadingDelete: false, deleteError: true };
            }return comment;
          });
        });
        setSuccessDelete(false);
      });
  }

  return (
    <>
      {successDelete && (
        <aside className="success">Successfully deleted!</aside>
      )}
      {articleComments.map((comment) => (
        <section key={comment.comment_id} id="individual-comment-container">
          <b>{comment.author}</b>
          <p className="italic">
            {arrangeDate(comment.created_at)}, {arrangeTime(comment.created_at)}
          </p>
          <hr></hr>
          <p>"{comment.body}"</p>
          <div id="comment-button-container">
            <button>↑</button>
            <p>{comment.votes}</p>
            <button>↓</button>
          </div>
          {comment.author === currentUser.username &&
            !comment.loadingDelete && (
              <>
                <button onClick={() => deleting(comment.comment_id)}>DELETE</button>
              </>
            )}
          {comment.loadingDelete && <p>deleting...</p>}
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
