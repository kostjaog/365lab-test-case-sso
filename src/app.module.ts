import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot(
    //database url string
    'mongodb://root:root@localhost:27017/'
    )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

