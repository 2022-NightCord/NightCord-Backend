import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mariadb',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        synchronize: true,
        logging: true,
        entities: [__dirname + '/**/entities/*.entity.{js,ts}']
      }),
      ChatModule,
  ],
})
export class AppModule {}
