import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MyLogger } from './logger/my-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true
  });

  // => /api
  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Onepiece') // 文档标题
        .setDescription('这是接口文档') // 文档描述
        .setVersion('1.1.0') // 文档版本
        .addTag('cats添加标签') // 添加标签
        .addBearerAuth() // 添加 Bearer Token 认证支持
        .build()
    )
  );

  // 使用自定义 Winston 日志器替换内置 Logger
  app.useLogger(app.get(MyLogger));
  app.useStaticAssets('public');
  app.use(
    session({
      secret: 'hello world', // session方案 需要一个唯一字符串密钥
      resave: false,
      saveUninitialized: false
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
