import { Injectable } from '@nestjs/common';

@Injectable()
export class MemberService {
  updateMemberData() {
    console.log('회원 데이터 업데이트');
  }
}
