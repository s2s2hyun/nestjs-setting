import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MemberModule } from '@/modules/member/member.module';

@Module({
  imports: [ScheduleModule.forRoot(), MemberModule], // 스케줄러 모듈 추가
  providers: [TasksService], // 스케줄러 서비스 등록
})
export class TasksModule {}
