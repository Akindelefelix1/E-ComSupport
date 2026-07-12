import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap() { const app = await NestFactory.create(AppModule); app.use(helmet()); app.setGlobalPrefix('api'); app.enableVersioning({type:VersioningType.URI,defaultVersion:'1'}); app.enableCors({origin:(process.env.CORS_ORIGIN||'http://localhost:5173').split(','),credentials:true}); app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,transform:true})); const config=new DocumentBuilder().setTitle('E-ComSupport API').setDescription('Support platform API').setVersion('1.0').addBearerAuth().build(); SwaggerModule.setup('api/docs',app,SwaggerModule.createDocument(app,config)); await app.listen(process.env.PORT||3000,'0.0.0.0'); } bootstrap();
