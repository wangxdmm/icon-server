import path from 'path'

export function resolve(dir: string, fileName: string) {
  return path.resolve(dir, fileName)
}

export function genLink(url: string, server?: string) {
  const assetId = url.split('/').pop()
  return server ? `${server}/fv1/${assetId}` : `/fv1/${assetId}`
}
