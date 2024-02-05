import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-sarah.onrender.com/api",
});

export const getArticles = () => {
    return ncNews.get("/articles").then((response) => {
        return response.data
    })
}