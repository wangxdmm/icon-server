export interface IconEntity {
  code: string
  name: string
  libraryCode: string
  tags?: string[]
  symbol: string
  unicode: string
  svg: string
}

export type CSSOptions = {
  fontname: string
  cssPath: string
  prefix: string
  fontSize: string
  cssString: string
  timestamp: number
  ttfLink: string
  woffLink: string
  woff2Link: string
}
