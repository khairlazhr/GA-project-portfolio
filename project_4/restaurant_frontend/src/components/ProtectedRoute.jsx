import { Navigate, useLocation, Outlet } from "react-router-dom"


function ProtectedRoute() {
    const location = useLocation()
    const isAuthenticated = JSON.parse(localStorage.getItem("accessObject")).name

    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute
