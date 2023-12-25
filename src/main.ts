import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(UserModule);

    await app.listen(3000);

    Logger.log(`~ Application is running on: ${await app.getUrl()}`);
  } catch (error: any) {
    Logger.error(`~ Ouch, something went wrong: ${error.message}`);
  }
}
bootstrap();
