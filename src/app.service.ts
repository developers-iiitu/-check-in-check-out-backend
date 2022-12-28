import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      error: false,
      message: `Server is up and Running on v${process.env.npm_package_version}`,
    };
  }
}
