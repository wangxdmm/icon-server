import { join } from 'path'
import { print } from './utils'
import dotenv from 'dotenv'

// "before" will trigger before the app lift.
export const bootstrapBefore = (): object => {
  // solve ncc path link.
  const envFileName = `.env.${process.env.NODE_ENV}`
  const result = dotenv.config({
    path: join(__dirname, `../${envFileName}`),
  })
  if (result.error) {
    print.danger('Environment variable not loaded: not found ".env" file.')
    return {}
  }
  print.log(`${envFileName} loaded.`)
  return result.parsed
}

// "after" will trigger after the "container" mounted..
export const bootstrapAfter = (): any => {}
