import ViewAll from "./ViewAll"
import ViewIndivudal from "./ViewIndividual"
import ViewTopics from "./ViewTopics"
import './CSS/nav.css'

export default function Navigation({setTopicQuery}) {
    return (
        <nav>
            <ViewAll/>
            <ViewTopics setTopicQuery={setTopicQuery}/>
            <ViewIndivudal/>
        </nav>
    )
}