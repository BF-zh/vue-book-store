import type { AxiosRequestHeaders, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig, Method } from 'axios'
import type { ShallowRef } from 'vue'
import type { Expand } from '@/types'
// import { HttpStatus } from '@bf-im/types'
import axios from 'axios'

type DefaultRequestOptions = Expand<CreateAxiosDefaults> & {
  beforeRequest?: (params: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  afterRequest?: (result: AxiosResponse) => AxiosResponse
}

interface RequestParams {
  method?: Method
  url?: ShallowRef<string> | string
  params?: Record<string, any>
  immediate?: boolean
  watch?: boolean | (() => boolean)
  data?: ShallowRef<unknown | null> | unknown
  headers?: AxiosRequestHeaders
  done?: () => void
  error?: (error: any) => void
}

type RequestOptions = Expand<RequestParams>
type RequestExecuteOptions = Pick<RequestOptions, 'data' | 'params' | 'method' | 'url'>

interface RequestResult<D = unknown> {
  data: ShallowRef<D | null>
  status: ShallowRef<number>
  request: ShallowRef<XMLHttpRequest | null>
  response: ShallowRef<Response | null>
  loading: ShallowRef<boolean>
  refresh: () => void
  execute: <T>(options?: RequestExecuteOptions) => Promise<T>
  abort: () => void
}

export function createRequest(options: DefaultRequestOptions) {
  const controller = new AbortController()
  const { beforeRequest, afterRequest, ...defaultOptions } = options

  const https = axios.create({
    ...options,
    signal: controller.signal,
  })

  https.interceptors.request.use(beforeRequest, (error) => {
    return Promise.reject(error)
  })

  https.interceptors.response.use(afterRequest, (error) => {
    return Promise.reject(error)
  })

  return <D = any>(url: ShallowRef<string> | string, options?: RequestOptions): RequestResult<D> => {
    const allOptions = {
      ...defaultOptions,
      ...options,
    }
    const { method, params, data, headers, immediate, watch: watchRef, done, error } = allOptions
    const _data = shallowRef<D | null>(null)
    const status = shallowRef<number>(0)
    const request = shallowRef<XMLHttpRequest | null>(null)
    const response = shallowRef<Response | null>(null)
    const loading = shallowRef<boolean>(false)

    const execute = async <T>(o?: RequestExecuteOptions) => {
      const options = {
        ...allOptions,
        ...o,
      }
      try {
        loading.value = true
        const res = await https.request<T>({
          method,
          params,
          data,
          // @ts-ignore
          headers: headers as any,
          ...options,
          url: toValue(url),
        })
        _data.value = res
        status.value = res.status
        return res as T
      }
      catch (err) {
        error?.(err)
        return {
          data: null,
          status: 502,
          message: '请求失败',
        } as T
      }
      finally {
        loading.value = false
        done?.()
      }
    }

    watch(() => [url, options?.method], () => {
      const canWatch = typeof watchRef === 'function' ? watchRef() : watchRef
      canWatch && execute()
    }, {
      deep: true,
    })

    immediate && execute()
    const refresh = () => {
      execute({
        params: {
          t: Date.now(),
        },
      })
    }

    const abort = () => controller.abort()
    return {
      data: _data,
      status,
      request,
      response,
      loading,
      execute,
      refresh,
      abort,
    }
  }
}

const __BASE_URL__ = import.meta.env.VITE_API_URL || 'http://localhost:8888'

// const ErrorCode = [HttpStatus.USER_NOT_FOUND, HttpStatus.PASSWORD_ERROR, HttpStatus.USER_DISABLED]

export const useRequest = createRequest({
  baseURL: __BASE_URL__,
  timeout: 20000,
  responseType: 'json',
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 500
  },
  beforeRequest(config) {
    // const { token } = useAuthStore()
    // console.log({ token })
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  afterRequest(result) {
    const { code, message } = result.data
    // ErrorCode.includes(code) && ElMessage.error(message)
    return result.data
  },
})
