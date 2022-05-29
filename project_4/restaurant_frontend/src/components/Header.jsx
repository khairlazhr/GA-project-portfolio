import logo from "../images/logo.png"
import {Link} from "react-router-dom"
import CustomLink from "./CustomNavBarLink"

function Header({ currentUser, logout, userId }) {
    return (
        <header className="nav-header">
            <div className="nav-header__title-bar">
                <div className="nav-header__title-container">
                    <img className="nav-header__logo" src={logo} alt="Cafe logo"/>
                    <h3 className="nav-header__title">Cafena</h3>
                    <p className="nav-header__sub-title">A cup and more.</p>
                </div>
                <div className={currentUser ? "nav-header__link-container--user" : "nav-header__link-container--anonymous"}>
                    {currentUser 
                    ? <>
                        <Link to={`/profile/${userId}`} className="nav-header__welcome">
                            <i className="ri-user-fill"></i>
                            {currentUser}
                        </Link>
                        <Link className="link nav-header__link--cart" to="/cart">Cart</Link>
                        <button className="link nav-header__link--logout" onClick={() => logout()}>Log Out</button>
                    </>
                        
                    :<>
                        <Link className="link nav-header__link--login" to="/login">Login</Link>
                        <Link className="link nav-header__link--register"  to="/register">Register</Link>
                    </>}
                </div>
            </div>
            <nav className="nav-header__navbar">
                <ul className="nav-header__list">
                    <li className="nav-header__item">
                        <CustomLink to="/" className="link nav-header__link--navbar">Home</CustomLink>
                    </li>
                    <li className="nav-header__item">
                        <CustomLink to="/menu" className="link nav-header__link--navbar">Menu</CustomLink>
                    </li>
                    <li className="nav-header__item">
                        <CustomLink to="/bookings" className="link nav-header__link--navbar">Bookings</CustomLink>
                    </li>
                    <li className="nav-header__item">
                        <CustomLink to="/contact" className="link nav-header__link--navbar">Contact Us</CustomLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header