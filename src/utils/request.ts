import axios from "axios";
import { ElMessage } from "element-plus";

const http = axios.create({
    baseURL: '/app-dev/',
    timeout: 10000
})


http.interceptors.request.use((config) => {
    return config
})


http.interceptors.request.use((res) => {
    const {data} = res.data
    if(data.code !== 200){
        ElMessage.error(data.message)
    }
    return data
})


export default http
