import "./CSS/header.css";
import UsernameContext from "./CONTEXTS/UsernameContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const { currentUser } = useContext(UsernameContext);

  let d = new Date();
  let formatter = Intl.DateTimeFormat("default", {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  // console.log(formatter.format(d));

  return (
    <header>
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <div id='right-side-header'>
        <p id="user-greeting">Hello {currentUser.username}!</p>
        <p id='date'>{formatter.format(d)}</p>
      </div>
    </header>
  );
}
