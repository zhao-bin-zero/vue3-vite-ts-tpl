export type Method = 'GET' | 'POST'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
  baseURL?: string
  url: string
  data?: any
  params?: any
  method?: Method
  headers?: object
  timeout?: number
  responseType?: ResponseType
}

export interface AxiosResponse {
  data: any
  headers: object
  request?: any
  status: number
  statusText: string
  config: AxiosRequest
}

export interface CustomResponse<T> {
  readonly code: number
  readonly message: string
  readonly data: T
}
