import React, { useEffect, useState } from "react";
import { getCommentsByID } from "./UTILS/utils";
import PostComment from "./PostComment";
import "./CSS/comments.css";

export default function Comments({ articleID, setArticleData }) {
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    if (articleID) {
      getCommentsByID(articleID)
        .then((response) => {
          setArticleComments(response.comments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [articleID]);

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
    <>
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
