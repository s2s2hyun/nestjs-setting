import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()], // 스케줄러 모듈 추가
  providers: [TasksService], // 스케줄러 서비스 등록
})
export class TasksModule {}
