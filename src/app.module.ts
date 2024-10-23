import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from '@/modules/board/board.module';
import { MemberModule } from '@/modules/member/member.module';
import { UploadsModule } from '@/modules/uploads/uploads.module';
import { TasksModule } from '@/tasks/tasks.module';

@Module({
  imports: [
    TasksModule, // 스케줄러 모듈 초기화
    BoardModule,
    MemberModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
