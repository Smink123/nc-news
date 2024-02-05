import { useState } from "react"
import './CSS/nav.css'

export default function Expandable({ children, contentDescriptor }) {
    const [isOpen, setIsOpen] = useState(false)


    const toggleOpen = () => {
        setIsOpen((currentIsOpen) => !currentIsOpen)
    };

    return (
        <div className='drop-down-organiser'>
            <button onClick={toggleOpen}>
            {isOpen ? "HIDE" : "SHOW"} {contentDescriptor}
            </button>
            {isOpen ? children : null}
        </div>
    )
}