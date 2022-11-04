import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors();
  app.use(
    session({
      secret: process.env.SECRET_SESSION_KEY,
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge:60000
      }
    }),
  );
  app.use(passport.initialize())
  app.use(passport.session())
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
