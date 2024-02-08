import './CSS/header.css'
import UsernameContext from './CONTEXTS/UsernameContext';
import { useContext } from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    const { currentUser }= useContext(UsernameContext);
    return (
        <header>
            <Link to="/" >
            <h1>NC News</h1>
            </Link>
            <p id="user-greeting">Hello {currentUser.username}!</p>
        </header>
    )
}