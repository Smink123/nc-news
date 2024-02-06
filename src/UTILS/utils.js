import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-sarah.onrender.com/api",
});

export const getArticles = () => {
    return ncNews.get('/articles').then((response) => {
        return response.data
    })
}

export const getArticleByID = (id) => {
  return ncNews.get(`/articles/${id}`).then((response) => {
    return response.data
})
}

export const getCommentsByID = (id) => {
  return ncNews.get(`/articles/${id}/comments`).then((response) => {
    return response.data
})
}

export const patchArticleVote = (update, id) => {
  return ncNews.patch(`/articles/${id}`, update).then((response) => {
    return response.data
  })
}

export const postComment = (comment, id) => {
  return ncNews.post(`/articles/${id}/comments`, comment).then((response) => {
    return response.data;
  });
};

export const deleteComment = (id) => {
  return ncNews.delete(`/comments/${id}`).then((response) => {
    return response.data
  })
}

