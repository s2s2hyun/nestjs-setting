import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || '127.0.0.1';

  // 전역 프리픽스 설정
  app.setGlobalPrefix('v1');

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('API 문서') // API 문서의 제목
    .setDescription('API 설명') // API 문서 설명
    .setVersion('1.0') // 버전 설정
    .addBearerAuth() // JWT 인증을 사용하는 경우
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // /api 경로에 Swagger UI 설정

  await app.listen(PORT, HOST);

  console.log(`Application is running on: http://${HOST}:${PORT}`);
}
bootstrap();





