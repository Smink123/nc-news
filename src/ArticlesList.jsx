import "./CSS/article-container.css";

export default function ArticlesList({ searchResultsArticles }) {
  console.log("inside list: ", searchResultsArticles.result);

  function arrangeDate(timeString) {
    const timeArray = timeString.split("T");
    return timeArray[0];
  }
  function arrangeTime(timeString) {
    const timeArray = timeString.split("T");
    const time = timeArray[1];
    const trimmedTime = time.substring(0, 5);
    return trimmedTime;
  }
  return (
    <>
      <p>Total articles: {searchResultsArticles.total_count}</p>
      {searchResultsArticles.result.map((item) => {
        return (
          <div id="article-container" key={item.article_id}>
            <div id="article-top">
              <p id="article-title">{item.title}</p>
              <p>By {item.author}</p>
              <div id="author-time">
                <p>
                  Created {arrangeDate(item.created_at)},{" "}
                  {arrangeTime(item.created_at)}{" "}
                </p>
                <p className="italic">{item.topic}</p>
              </div>
            </div>
            <img src={item.article_img_url} alt={item.title} />
            <div id="article-body">
              <p>{item.body}</p>
            </div>
            <div id="votes-container">
              <button>↑</button>
              <p>Votes: {item.votes}</p>
              <button>↓</button>
            </div>
            <div id='comments-top'>
              <p>Comments: {item.comment_count}</p>
              <button>Show comments</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

//article_id
