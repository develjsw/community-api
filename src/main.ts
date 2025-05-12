import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseFormatInterceptor } from './common/interceptor/response-format.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    app.useGlobalInterceptors(new ResponseFormatInterceptor());

    await app.listen(9999);
}
bootstrap();
