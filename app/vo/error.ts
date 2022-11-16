export interface ErrorResponse {
  code: number
  message: string
  exception: string
  success: false
}

export enum ERROR_NUM {
  NODE_INTERNAL_ERROR = 5000,
  FILE_SERVER_ERROR,
}
