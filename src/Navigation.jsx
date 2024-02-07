import ViewAll from "./ViewAll"
import ViewIndivudal from "./ViewIndividual"
import ViewTopics from "./ViewTopics"
import './CSS/nav.css'

export default function Navigation({setTopicQuery}) {
    return (
        <nav>
            <h3>Navigation</h3>
            <ViewAll/>
            <ViewIndivudal/>
            <ViewTopics setTopicQuery={setTopicQuery}/>
        </nav>
    )
}