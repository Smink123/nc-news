import "./CSS/article-container.css";
import { Link } from "react-router-dom";

export default function ArticlesList({ searchResultsArticles }) {

  return (
    <article id='entire-articles'>
      {searchResultsArticles.result.map((item) => {
        return (
          <div id="article-container" key={item.article_id}>
            <section id="article-top">
              <h3 id='article-header'>{item.title}</h3>
              <p>By {item.author}</p>
              <p className="italic">{item.topic}</p>
            </section>
            <img id='all-img'src={item.article_img_url} alt={`Photograph image for ${item.title}`} />
            <Link to={`/articles/${item.article_id}`}>
              <button>view article</button>
            </Link>
          </div>
        );
      })}
      </article>
  );
}