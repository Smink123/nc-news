import "./CSS/article-container.css";
import { Link } from "react-router-dom";
import { arrangeDate } from "./UTILS/changeTime";
import { arrangeTime } from "./UTILS/changeTime";
import { capitalise } from "./UTILS/capitalise";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function ArticlesList({ searchResultsArticles, loadArticles }) {
  if (loadArticles) return <p>Loading articles...</p>

  return (
    <article id="entire-articles">
      {searchResultsArticles.result.map((item) => {
        return (
          <div id="article-container" key={item.article_id}>
            <section id="article-top">
              <h3 id="article-header">{item.title}</h3>
              <p id='all-articles-author'>By {item.author}</p>
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
              <div id="emoji-container">
                <p>{<ChatBubbleOutlineIcon/>}{item.comment_count}</p>
                {item.votes >= 0 && <p>{<ArrowUpwardIcon />}{item.votes}</p>}
                {item.votes < 0 && <p>{<ArrowDownwardIcon />} {item.votes}</p>}
              </div>
              <Link to={`/articles/${item.article_id}`}>
                <button id='all-page-view-more'>view article</button>
              </Link>
            </div>
          </div>
        );
      })}
    </article>
  );
}
