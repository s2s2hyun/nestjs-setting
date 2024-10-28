import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from '@/modules/board/board.module';
import { MemberModule } from '@/modules/member/member.module';
import { UploadsModule } from '@/modules/uploads/uploads.module';
import { TasksModule } from '@/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { KnexModule } from './knex/knex.module';

@Module({
  imports: [
    KnexModule,
    TasksModule, // 스케줄러 모듈 초기화
    BoardModule,
    MemberModule,
    UploadsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 환경 변수를 접근할 수 있도록 설정
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
