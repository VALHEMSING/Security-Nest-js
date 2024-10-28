import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 1,
     },]),
    MongooseModule.forRoot('mongodb://localhost:27017/Pruebados'),
    AuthModule,
    BookModule,
  ],
  
})
export class AppModule {}
