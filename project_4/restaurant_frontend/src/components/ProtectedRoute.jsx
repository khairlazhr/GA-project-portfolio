import { Navigate, useLocation, Outlet } from "react-router-dom"


function ProtectedRoute() {
    const location = useLocation()
    const accessObject = localStorage.getItem("accessObject")
    console.log("hello")
    return (
        accessObject
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute
