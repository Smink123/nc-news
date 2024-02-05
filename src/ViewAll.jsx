import { Link } from "react-router-dom";

export default function ViewAll() {
    return (
        <>
        <Link to={"/articles"}>
        <button>View all</button>
        </Link>
        </>
    )
}