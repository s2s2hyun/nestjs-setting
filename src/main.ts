import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000; // .env 파일에서 PORT 사용
const HOST = process.env.HOST || '127.0.0.1';

  await app.listen(PORT,HOST);

  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
