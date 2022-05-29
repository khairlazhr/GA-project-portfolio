import ProfileSideBar from "../components/ProfileSidebar"
import { Outlet, useParams } from "react-router-dom"

function ProfilePage() {
    const { id } = useParams()
    return (
        <div className="profile page-container">
            <ProfileSideBar id={id}/>
            <Outlet />
        </div>
    )
}

export default ProfilePage