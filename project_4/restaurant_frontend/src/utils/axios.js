import axios from "axios";

const axiosToken = axios.create()

axiosToken.interceptors.request.use(function(config) {
    const accessObject = JSON.parse(localStorage.getItem("accessObject"))
    if (accessObject) {
        const token = accessObject.access
        config.headers.Authorization = `Bearer ${token}`

        return config
    }
})

axiosToken.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest.url === "https://cafenacoffee.herokuapp.com//api/accounts/token/refresh") {
            return Promise.reject(error)
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            const accessObject = JSON.parse(localStorage.getItem("accessObject"))
            const refreshToken = accessObject.refresh
            await axiosToken({
                method: "POST",
                url: "https://cafenacoffee.herokuapp.com//api/accounts/token/refresh", 
                data: {
                    "refresh": refreshToken
                }
            }).then(res => {
                const data = res.data
                accessObject.access = data.access
                accessObject.refresh = data.refresh
                localStorage.setItem("accessObject", JSON.stringify(accessObject))
            })
            return axiosToken(originalRequest)
        }
        return Promise.reject(error);
    }
)

export default axiosToken;