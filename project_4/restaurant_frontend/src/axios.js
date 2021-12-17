import axios from 'axios';
const axiosAuthenticated = axios.create() 
const axiosRefresh = axios.create()

let access = localStorage.getItem('access')
let refresh = localStorage.getItem('refresh')


axiosAuthenticated.defaults.headers.common = {'Authorization': `Bearer ${access}`}

axiosAuthenticated.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest.url === "http://localhost:8000/api/accounts/token/refresh") {
            return Promise.reject(error)
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            await axiosRefreshToken.post("/api/accounts/token/refresh", {
                "refresh": refresh
            });
            return axiosAuthenticated(originalRequest)
        }
        return Promise.reject(error)
    }
)

axiosRefresh.interceptors.response.use(
    response => {
        localStorage.setItem("access", response.data.access)
        localStorage.setItem("refresh", response.data.refresh)
    },
    error => error
)

export default axiosAuthenticated
