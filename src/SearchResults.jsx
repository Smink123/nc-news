import { getArticles } from "./UTILS/utils"
import { useEffect } from "react"
import { useState } from "react";
import ArticlesList from "./ArticlesList";
import './CSS/search-results-container.css'

export default function SearchResults({searchResultsArticles, setSearchResultArticals}) {
    const [viewResults, setViewResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getArticles().then((response) => {
            console.log(response.articles.total_count)
            setSearchResultArticals(response.articles)
            setViewResults(true);
        })
        .catch((err) => {
            console.log('error: ', err)
        })
    }, [])
    if (viewResults)
    return (
        <>
        
        {/* <p>Total articles: {searchResultsArticles.total_count}</p> */}
        <main>

        <ArticlesList searchResultsArticles={searchResultsArticles}/>

        </main>
        </>
    )
}