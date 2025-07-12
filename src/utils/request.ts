import axios from 'axios'

const http = axios.create({
  baseURL: '/app-dev/',
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

http.interceptors.response.use(
  (res) => {
    const { data } = res
    // if (data.code !== 200) {
    //   return Promise.reject(new Error(data.message || 'Error'))
    // }

    return Promise.resolve(data)
  },
  err => Promise.reject(new Error(err.message || 'Error')),
)

export default http
