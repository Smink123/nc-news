import { useState, useEffect } from "react";
import Expandable from "./Expandable";
import { Link } from "react-router-dom";
import { getTopics } from "./UTILS/utils";
import { capitalise } from "./UTILS/capitalise";

import './CSS/nav.css'

export default function ViewTopics({ searchParams, setSearchParams }) {
  const [viewTopicTitles, setViewTopicTitles] = useState([]);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  function setTopicQuery(topic) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("topic", topic);
    setSearchParams(newParams);
  }
  useEffect(() => {
    getTopics().then((response) => {
      setViewTopicTitles(response.topics)
      setButtonsVisible(true);
    })
    .catch((err) => {
      console.log("error: ", err);
    });
  }, [])

  return (
    <>
      <Expandable contentDescriptor="Topic">
        {buttonsVisible && (
          <>
            {viewTopicTitles.map((topic) => (
              <Link to={`/articles?topic=${topic.slug}`} key={topic.slug} onClick = {() => {
                setTopicQuery(topic.slug) 
              }}>
                <button className="dropdown-button">{capitalise(topic.slug)}</button>
              </Link>
            ))}
          </>
        )}
      </Expandable>
    </>
  )
}