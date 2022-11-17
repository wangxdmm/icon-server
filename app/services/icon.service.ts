import type { IconAssetsMessage } from 'app/dto/icon'
import type { Response } from 'app/vo/response'
import type { IconAssetsMetaMessage } from 'app/vo/icon'
import { Service } from 'typedi'
import SVGIcons2SVGFont from 'svgicons2svgfont'
import svg2ttf from 'svg2ttf'
import { print } from 'configs/utils'
import stringToStream from 'string-to-stream'
import fs, { ReadStream } from 'fs-extra'
import color from 'colors-cli'
import { resolve as pathResolve, genLink } from 'app/helpers/path'
import ttf2woff from 'ttf2woff'
import ttf2woff2 from 'ttf2woff2'
import FormData from 'form-data'
import axios, { type AxiosResponse } from 'axios'
import CONSTANTS from 'configs/constants'
import { FileUploadResultDetail } from 'app/dto/file'
import { success, fail } from 'app/helpers/server'
import { ErrorResponse, ERROR_NUM } from 'app/vo/error'
import type { CSSOptions } from 'app/entity/icon'
import mustache from 'mustache'
import jsdom from 'jsdom'
import type { IconEntity } from 'app/entity/icon'
@Service()
export class IconService {
  private temporaryDir = pathResolve(__dirname, './assets')
  private cssTplUrl = pathResolve(__dirname, '../templates/css.mustache')

  assetsType = ['ttf', 'woff', 'woff2', 'css'] as const

  genIconAssets(iconAssetsMessage: IconAssetsMessage) {
    return new Promise(resolve => {
      const inValidIcons: IconEntity[] = []
      const fontStream = new SVGIcons2SVGFont({
        log: message => print.log(message),
        ...{
          fontHeight: 1000,
          normalize: true,
        },
      })
      const { icons, name: projectName } = iconAssetsMessage
      const assetNames = this.assetsType.reduce((cur, next) => {
        cur[next] = `${projectName}.${next}`
        return cur
      }, {} as Record<typeof this.assetsType[number], string>)

      let cssString = ''

      for (let i = 0; i < icons.length; i++) {
        const { name, svg, unicode, symbol } = icons[i]
        if (name) {
          cssString += `.${projectName}-${name}:before { content: "\\${unicode
            .charCodeAt(0)
            .toString(16)}";}\n`
        }
        let svgStr = svg
        // svg源文件不存在 但是symbol存在
        if (!svg && symbol) {
          svgStr = this.transSvgSymbolToSvg(symbol)
        }

        if (!svgStr) {
          inValidIcons.push(icons[i])
          continue
        }

        const glyph = stringToStream(svgStr) as ReadStream & {
          metadata: { unicode: string[]; name: string }
        }

        glyph.metadata = {
          unicode: [unicode],
          name: name,
        }
        fontStream.write(glyph)
      }
      // 过滤出不合法的icon
      if (inValidIcons.length) {
        resolve(
          fail(ERROR_NUM.NODE_INTERNAL_ERROR, '资源不合法', 'invalid svg or symbol', {
            errorDetail: inValidIcons,
          }),
        )
      }

      const chunks = []
      fontStream
        .on('data', chunk => {
          chunks.push(chunk)
        })
        .on('finish', async () => {
          print.log(
            `${color.green('SUCCESS')} ${color.blue('SVG')} font successfully created!\n`,
          )
          const uploads: Promise<FileUploadResultDetail | ErrorResponse>[] = []
          const ttf = svg2ttf(chunks.toString())
          const ttfBuf = Buffer.from(ttf.buffer)
          const woffBuf = Buffer.from(ttf2woff(ttfBuf).buffer)
          const woff2Buf = Buffer.from(ttf2woff2(ttfBuf).buffer)

          this.createTTF(ttfBuf)

          uploads.push(
            this.uploadAssets(ttfBuf, assetNames.ttf),
            this.uploadAssets(woffBuf, assetNames.woff),
            this.uploadAssets(woff2Buf, assetNames.woff2),
          )

          try {
            const results = await Promise.all(uploads)
            if (results.length && results.every(this.isValidFile)) {
              const [ttf, woff, woff2] = results
              const cssBuf = this.createCss({
                fontname: projectName,
                cssPath: '',
                timestamp: Date.now(),
                prefix: projectName,
                fontSize: '12px',
                cssString,
                ttfLink: genLink(ttf.url),
                woffLink: genLink(woff.url),
                woff2Link: genLink(woff2.url),
              })
              const css = await this.uploadAssets(cssBuf, assetNames.css)
              if (this.isValidFile(css)) {
                resolve(
                  success(
                    {
                      css,
                      ttf,
                      woff,
                      woff2,
                      cssHref: genLink(css.url, CONSTANTS.SC_WEB_URL),
                    } as IconAssetsMetaMessage,
                    `${projectName}图标资源已经生成`,
                  ),
                )
              } else {
                resolve(this.failResult([...results, css]))
              }
            } else {
              resolve(this.failResult(results))
            }
          } catch (error) {
            resolve(fail(ERROR_NUM.NODE_INTERNAL_ERROR, '生成资源失败', error.message))
          }
        })
        .on('error', error => {
          if (error) {
            print.danger(error.message)
            resolve(fail(ERROR_NUM.NODE_INTERNAL_ERROR, '生成资源失败', error.message))
          }
        })

      fontStream.end()
    })
  }

  isValidFile(x: any): x is FileUploadResultDetail {
    return x && !x.exception
  }

  failResult(results: (FileUploadResultDetail | ErrorResponse)[]) {
    fail(ERROR_NUM.FILE_SERVER_ERROR, '上传文件失败', 'uploadAssets报错', {
      errorDetails: results.map((i, index) => {
        let mess: string
        if (this.isValidFile(i)) {
          mess = `上传成功, code: ${i.code}, url: ${i.url}`
        } else {
          mess = i.message
        }
        return `${this.assetsType[index]}: ${mess}`
      }),
    })
  }

  async uploadAssets(
    buffer: Buffer,
    name: string,
  ): Promise<FileUploadResultDetail | ErrorResponse> {
    const form = new FormData()
    form.append('file', buffer, name)
    try {
      const { data } = await axios.post<
        FormData,
        AxiosResponse<Response<FileUploadResultDetail, true>>
      >(`${CONSTANTS.SC_FILE_SERVER}/attachment/upload`, form)
      return data.data
    } catch (error) {
      print.danger(error.response?.data)
      return error.response?.data
    }
  }

  createAssetDir() {
    try {
      fs.accessSync(this.temporaryDir)
      fs.unlinkSync(this.temporaryDir)
    } catch (error) {
      //
    } finally {
      fs.mkdirSync(this.temporaryDir, { recursive: true })
    }
  }

  isSVGSymbol(s: string) {
    return s.startsWith('<symbol')
  }

  transSvgSymbolToSvg(s: string): string | undefined {
    const symbolStr = s.trim()
    if (this.isSVGSymbol(symbolStr)) {
      const symbolDom = new jsdom.JSDOM(symbolStr)
      const symbolNodes = symbolDom.window.document.querySelectorAll('symbol')
      if (symbolNodes.length > 1 || symbolNodes.length <= 0) {
        return
      } else {
        const symbolRoot = symbolNodes[0]
        const viewBox = symbolRoot.getAttribute('viewBox')
        const innerHTML = symbolRoot.innerHTML
        const viewBoxValue = viewBox ? (viewBox.trim() ? viewBox : undefined) : undefined
        return `<svg xmlns="http://www.w3.org/2000/svg" ${
          viewBoxValue ? `viewBox="${viewBox}"` : ''
        }>${innerHTML}</svg>`
      }
    }
    return
  }

  createCss(options: CSSOptions): Buffer | undefined {
    const cssTpl = fs.readFileSync(this.cssTplUrl)
    // https://github.com/janl/mustache.js
    // use any to avoid ts error
    ;(mustache as any).escape = text => text
    if (cssTpl) {
      return Buffer.from(mustache.render(cssTpl.toString(), options))
    }
  }

  createTTF(buffer: Buffer) {
    this.createAssetDir()
    fs.writeFileSync(pathResolve(this.temporaryDir, './icon.ttf'), buffer, {})
  }

  createWOFF(buffer: Buffer) {
    fs.writeFileSync(
      pathResolve(this.temporaryDir, './icon.woff'),
      Buffer.from(ttf2woff(buffer).buffer),
    )
  }

  createWOFF2(buffer: Buffer) {
    fs.writeFileSync(
      pathResolve(this.temporaryDir, './icon.woff2'),
      Buffer.from(ttf2woff2(buffer).buffer),
    )
  }
}
