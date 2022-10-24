import axios from "axios";

// =============================================================================================================================
// INTERCEPTOR FOR REQUESTS TO API WITH JWT AUTHORIZATION REQUIRED
// =============================================================================================================================
const setInterceptorHeader = axios.create({
    baseURL: "http://localhost:8000/posts"
})

setInterceptorHeader.interceptors.request.use(
    (request) => {
        // console.log(JSON.parse(localStorage.getItem("auth")));
        request.headers['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("auth"))?.accessToken}`;
        return request;
    },
    (err) => {
        return Promise.reject(err)
    }
)

setInterceptorHeader.interceptors.response.use(
    (response) => {
        const data = response.data
        console.log(data + " header response interceptor")
        return response
    },
    async (err) => {
        // console.log(err.response.data + err.response.status + "  PRINTED by response interceptor")
        if (err.response.data === 'invalid token') {
            console.log("calling refresh " + localStorage.getItem("auth")?.refreshToken)
            const res = await axios.post('http://localhost:8000/api/auth/refreshtoken', { refreshToken: JSON.parse(localStorage.getItem("auth"))?.refreshToken })
            const { status } = res.data

            if (status === "failed") {
                console.log("Sorry user logged out");
                // =============================================================================================================================
                // IMPLEMENT AUTO LOGOUT FUNCTIONALITY HERE
                // =============================================================================================================================
                return Promise.reject(err)
            }
            const { authToken } = res.data
            localStorage.setItem("auth", JSON.stringify(authToken))
            console.log("axios interceptor RELOGIN")

            // =============================================================================================================================
            // IMPLEMENT REDIRECT/REPEAT CALL FUNCTIONALITY      **********USING CONFIG**********
            // =============================================================================================================================
        }
        return Promise.reject(err)
    }
)

export default setInterceptorHeader

// import axios from "axios";

// const setInterceptorHeader = axios.create({
//     baseURL: '/posts'
// })


// setInterceptorHeader.interceptors.request.use(
//     (request) => {
//         request.headers.common['Accept'] = 'applicatio/json';
//         request.headers.common['user'] = 'realjod';
//         console.log("request sent")
//         return request;
//     },
//     (err) => {
//         return Promise.reject(err)
//     }
// )

// export default setInterceptorHeader


