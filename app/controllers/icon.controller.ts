import { BadRequestError, Post, JsonController, Body, Get } from 'routing-controllers'
import { IconService } from '../services'
import { Service } from 'typedi'
import type { IconAssetsMessage } from 'app/dto/icon'

@JsonController()
@Service()
export class IconController {
  constructor(private iconService: IconService) {}

  @Post('/assets')
  async asserts(@Body() iconAssetsMessage: IconAssetsMessage) {
    return await this.iconService.genIconAssets(iconAssetsMessage)
  }
}
