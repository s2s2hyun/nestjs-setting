import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MemberService } from '@/modules/member/member.service';

@Injectable()
export class TasksService {
  constructor(private readonly memberService: MemberService) {}
  // 매일 자정에 실행하는 작업
  @Cron('0 0 * * *', {
    timeZone: 'Asia/Seoul',
  })
  handleCron() {
    console.log('매일 자정에 실행되는 스케줄러 작업입니다.');

    // 멤버서비스 업데이트
    this.memberService.updateMemberData();
  }
}
