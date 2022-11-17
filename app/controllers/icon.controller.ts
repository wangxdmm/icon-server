import { Post, JsonController, Body } from 'routing-controllers'
import { IconService } from '../services'
import { Service } from 'typedi'
import type { IconAssetsMessage } from 'app/dto/icon'
import { fail } from 'app/helpers/server'
import { ERROR_NUM } from 'app/vo/error'

@JsonController()
@Service()
export class IconController {
  constructor(private iconService: IconService) {}

  @Post('/assets')
  async assets(@Body() iconAssetsMessage: IconAssetsMessage) {
    try {
      return await this.iconService.genIconAssets(iconAssetsMessage)
    } catch (error) {
      return fail(ERROR_NUM.NODE_INTERNAL_ERROR, error.message, error.toString())
    }
  }
}
