import type { AxiosRequestHeaders, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig, Method } from 'axios'
import type { ShallowRef } from 'vue'
import type { Expand } from '@/types'
// import { HttpStatus } from '@bf-im/types'
import axios from 'axios'

type DefaultRequestOptions = Expand<CreateAxiosDefaults> & {
  beforeRequest?: (params: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  afterRequest?: (result: AxiosResponse) => AxiosResponse
}

interface RequestParams<T = any, R = any> {
  method?: Method
  url?: ShallowRef<string> | string
  params?: Record<string, any>
  immediate?: boolean
  watch?: boolean | (() => boolean)
  data?: ShallowRef<T | null> | T
  headers?: AxiosRequestHeaders
  success?: (data: R) => void
  done?: () => void
  error?: (error: any) => void
}

// type RequestOptions = Expand<RequestParams>
type RequestExecuteOptions<T, R = any> = Pick<RequestParams<T, R>, 'data' | 'params' | 'method' | 'url'> | T

interface RequestResult<R = unknown, D = any> {
  data: ShallowRef<R | null>
  status: ShallowRef<number>
  request: ShallowRef<XMLHttpRequest | null>
  response: ShallowRef<Response | null>
  loading: ShallowRef<boolean>
  refresh: () => void
  execute: (options?: RequestExecuteOptions<D, R>) => Promise<R>
  $execute: (data: D) => Promise<R>
  abort: () => void
}

export function createRequest(options: DefaultRequestOptions) {
  const controller = new AbortController()
  const { beforeRequest, afterRequest, ...defaultOptions } = options

  const fn = () => { }

  const https = axios.create({
    ...options,
    signal: controller.signal,
  })

  https.interceptors.request.use(beforeRequest, (config) => {
    return { ...config, data: null, status: 502, message: '请求失败' }
  })

  https.interceptors.response.use(afterRequest, (config) => {
    return { ...config, data: null, status: 502, message: '请求失败' }
  })

  return <R = any, D = any>(url: ShallowRef<string> | string, options?: RequestParams<D, R>): RequestResult<R, D> => {
    const allOptions = {
      ...defaultOptions,
      ...options,
    }
    const { method, params, data, headers, immediate, watch: watchRef, done = fn, error = fn, success = fn } = allOptions
    const _data = shallowRef<R | null>(null)
    const status = shallowRef<number>(0)
    const request = shallowRef<XMLHttpRequest | null>(null)
    const response = shallowRef<Response | null>(null)
    const loading = shallowRef<boolean>(false)

    const execute = async (o?: RequestExecuteOptions<D>) => {
      //
      const options = {
        ...allOptions,
        ...o,
      }
      try {
        loading.value = true
        const res = await https.request<R>({
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
        success(res as R)
        return res as R
      }
      catch (err: unknown) {
        error(err)
        return err as R
      }
      finally {
        loading.value = false
        done()
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
      $execute: (data: D) => execute({ data }),
    }
  }
}

const __BASE_URL__ = import.meta.env.VITE_API_URL || 'http://localhost:8888'
console.log(__BASE_URL__)

// const ErrorCode = [HttpStatus.USER_NOT_FOUND, HttpStatus.PASSWORD_ERROR, HttpStatus.USER_DISABLED]

export const useRequest = createRequest({
  baseURL: __BASE_URL__,
  timeout: 20000,
  responseType: 'json',
  // withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 500
  },
  beforeRequest(config) {
    const { token } = useAuthStore()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  afterRequest(result) {
    return result.data
  },
})
