import CONSTANTS from 'configs/constants'
import path from 'path'

export function resolve(dir: string, fileName: string) {
  return path.resolve(dir, fileName)
}

export function genLink(url: string) {
  return `${CONSTANTS.SC_FILE_SERVER}${url}`
}