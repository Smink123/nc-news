import { useState, useEffect } from "react";
import Expandable from "./Expandable";
import { Link } from "react-router-dom";
import { getTopics } from "./UTILS/utils";
import { capitalise } from "./UTILS/capitalise";
import { CircularProgress } from "@mui/material";

import './CSS/nav.css'

export default function ViewTopics({ setTopicQuery }) {
  const [viewTopicTitles, setViewTopicTitles] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [loadingTopics, setLoadingTopics] = useState(false)

  useEffect(() => {
    setLoadingTopics(true)
    getTopics().then((response) => {
      setViewTopicTitles(response.topics)
      setLoadingTopics(false)

      setButtonsVisible(true);
    })
    .catch((err) => {
      setLoadingTopics(false)
    });
  }, [])

  if (loadingTopics) return (
    <div id='topics-loading'>
      <CircularProgress color="inherit" size={50} />
    </div>
  )
  return (
    <>
      <Expandable contentDescriptor="Topics">
        {buttonsVisible && (
          <>
            {viewTopicTitles.map((topic) => (
              <Link to={`/articles?topic=${topic.slug}`} key={topic.slug} onClick = {() => {
                setTopicQuery(topic.slug) 
              }}>
                <button key={topic.slug} onClick={() => setTopicQuery(topic.slug)} className="dropdown-button">{capitalise(topic.slug)}</button>
              </Link>
            ))}
          </>
        )}
      </Expandable>
    </>
  )
}