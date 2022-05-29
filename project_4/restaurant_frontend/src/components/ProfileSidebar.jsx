import CustomLink from "./CustomProfileBarLink"

function ProfileSideBar({ id }) {
    return (
        <nav className="profile-nav">
            <h3 className="profile-nav__title">Your Account</h3>
            <ul className="profile-nav__list">
                <li className="profile-nav__item">
                    <CustomLink to={`/profile/${id}`} className="profile-nav__link">Profile Details</CustomLink>
                </li>
                <li className="profile-nav__item">
                    <CustomLink to={`/profile/${id}/addresses`} className="profile-nav__link">Addresses</CustomLink>
                </li>
                <li className="profile-nav__item">
                    <CustomLink to={`/profile/${id}/orders`} className="profile-nav__link">Order History</CustomLink>
                </li>
            </ul>
        </nav>
    )
}

export default ProfileSideBar