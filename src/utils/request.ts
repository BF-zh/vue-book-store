import axios from 'axios'

const http = axios.create({
  baseURL: '/app-dev/',
  timeout: 3000,
})

http.interceptors.request.use((config) => {
  const __USER_AUTH__ = localStorage.getItem('__USER_AUTH__')

  config.headers.Authorization = `Bearer ${__USER_AUTH__ ? JSON.parse(__USER_AUTH__).token : ''}`
  return config
})

http.interceptors.response.use(
  (res) => {
    const { data } = res
    if (data.code !== 200) {
      return Promise.reject(new Error(data.message || 'Error'))
    }

    return Promise.resolve(data)
  },
  err => Promise.reject(new Error(err.message || 'Error')),
)

export default http
