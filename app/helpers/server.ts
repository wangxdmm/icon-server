import { ErrorResponse } from 'app/vo/error'
import { Response } from 'app/vo/response'

export function success<T>(
  data: T,
  message: string,
  other?: Record<string, any>,
): Response<T, true> {
  return {
    code: 20000,
    success: true,
    data,
    message,
    ...(other || {}),
  } as Response<T, true>
}

export function fail(
  code: number,
  message: string,
  exception: string,
  other?: Record<string, any>,
): ErrorResponse {
  return {
    code,
    success: false,
    exception,
    message,
    ...(other || {}),
  }
}
