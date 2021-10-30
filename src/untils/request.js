import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 60000,
    withCredentials: true
})

// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    // config.headers['token'] = window.localStorage.getItem("token");  // 设置请求头
    //
    // if (localStorage.getItem('token')) {
    //     config.headers.token = localStorage.getItem('token');
    //
    // }
    // hideLoading(); // 隐藏加载
    return config
}, error => {

    return Promise.reject(error)
});

request.interceptors.response.use(
    response => {
        let res = response.data;
        return res;
    },
    error => {
        console.log('err' + error)
        return error
    }
)


export default request