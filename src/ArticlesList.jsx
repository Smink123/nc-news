import "./CSS/article-container.css";
import { Link } from "react-router-dom";
import { arrangeDate } from "./UTILS/changeTime";
import { arrangeTime } from "./UTILS/changeTime";
import { capitalise } from "./UTILS/capitalise";

export default function ArticlesList({ searchResultsArticles, loadArticles }) {
  if (loadArticles) return <p>Loading articles...</p>

  return (
    <article id="entire-articles">
      {searchResultsArticles.result.map((item) => {
        return (
          <div id="article-container" key={item.article_id}>
            <section id="article-top">
              <h3 id="article-header">{item.title}</h3>
              <b>By {item.author}</b>
              <div id='article-top-two'>
                <p>
                  {arrangeDate(item.created_at)}, {arrangeTime(item.created_at)}
                </p>
                <p className="italic">{capitalise(item.topic)}</p>
              </div>
            </section>
            <img
              id="all-img"
              src={item.article_img_url}
              alt={`Photograph image for ${item.title}`}
            />
            <div id="article-bottom">
              <Link to={`/articles/${item.article_id}`}>
                <button>view article</button>
              </Link>
              <div id="emoji-container">
                <p>💬 {item.comment_count}</p>
                {item.votes >= 0 && <p>↑ {item.votes}</p>}
                {item.votes < 0 && <p>↓ {item.votes}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </article>
  );
}
