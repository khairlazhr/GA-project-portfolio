import { Link } from "react-router-dom"

function HomepageComponent() {
    return (
        <div className="">
          <span></span>
          <h5>Contact Us</h5>
          <p></p>
          <Link to="/contact-us">
              <button className="">Reach us!</button>
          </Link>
        </div>
    )
}

export default HomepageComponent