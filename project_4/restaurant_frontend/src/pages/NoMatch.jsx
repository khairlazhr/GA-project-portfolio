import { Link } from "react-router-dom";

function NoMatch() {
    return (
        <div className="no-match page-container">
            <h1 className="no-match__title">404 - Not Found!</h1>
            <Link className="button link" to="/">Go Home</Link>
        </div>
    )
}

export default NoMatch