import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './common/decorators';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiCreatedResponse({
    description: 'Keep Alive',
  })
  getHello(): object {
    return this.appService.getHello();
  }
}
