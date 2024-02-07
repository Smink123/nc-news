import { Link } from "react-router-dom";

export default function ViewAll() {
    return (
        <>
        <Link to={"/articles"}>
        <button id='view-all-button'>View All Articles</button>
        </Link>
        </>
    )
}