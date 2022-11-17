import { FileUploadResultDetail } from 'app/dto/file'

export type IconAssetsMetaMessage = {
  cssHref: string
} & Record<'css' | 'ttf' | 'woff' | 'woff2', FileUploadResultDetail>
