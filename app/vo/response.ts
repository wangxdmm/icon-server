export interface Response<T = any, S = boolean> {
  code: number
  data?: T
  message?: string
  success: S
  total?: number
  [index: string]: any
}
