import logo from "../images/logo.png"
import {Link} from "react-router-dom"

function Header({ currentUser, logout }) {
    return (
        <header>
            <div>
                <div>
                    <img src={logo} alt="Cafe logo"/>
                    <h3>Cafena</h3>
                    <p>A cup of coffee and more</p>
                </div>
                <div>
                    {currentUser 
                    ? <div>
                        <p>Welcome, {currentUser}</p>
                        <Link to="/cart">Cart</Link>
                        <button onClick={() => logout()}>Log Out</button>
                    </div> 
                    :<div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>}
                </div>
            </div>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/" className="nav__link">Home</Link></li>
                    <li className="nav-item"><Link to="/menu" className="nav__link">Menu</Link></li>
                    <li className="nav-item"><Link to="/bookings" className="nav__link">Bookings</Link></li>
                    <li className="nav-item"><Link to="/contact" className="nav__link">Contact Us</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header