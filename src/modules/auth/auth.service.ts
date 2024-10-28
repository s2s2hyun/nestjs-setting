import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Knex } from 'knex';
import * as jwt from 'jsonwebtoken';
import { getHasString } from '@/utils/hash'; // 해시 함수는 별도로 구현 필요
// import * as useragent from 'express-useragent';
import { ip2long } from '@/utils/iputils';
import { Request } from 'express'; // express의 Request 타입 추가

@Injectable()
export class AuthService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async authorize(
    authDto: { loginId: string; loginPass: string },
    req: Request,
  ) {
    const { loginId, loginPass } = authDto;

    if (loginId.length === 0) {
      throw new BadRequestException({
        code: 'AUTH.ERR003',
        error: '[이메일주소]를 입력하세요.',
      });
    }

    if (loginPass.length === 0) {
      throw new BadRequestException({
        code: 'AUTH.ERR004',
        error: '[비밀번호]를 입력하세요.',
      });
    }

    const user = await this.knex('wb_member')
      .where('mem_userid', loginId)
      .first();

    if (!user) {
      throw new BadRequestException({
        status: 400,
        code: 'AUTH.ERR005',
        error:
          '가입되지 않은 [이메일주소]이거나 [비밀번호]가 올바르지 않습니다.',
      });
    }

    const encryptedPassword = getHasString(loginPass);

    if (user.mem_password !== encryptedPassword) {
      throw new BadRequestException({
        status: 400,
        code: 'AUTH.ERR006',
        error:
          '가입되지 않은 [이메일주소]이거나 [비밀번호]가 올바르지 않습니다.',
      });
    }

    if (user.mem_status !== 'Y') {
      throw new BadRequestException({
        status: 400,
        code: 'AUTH.ERR007',
        error:
          '가입되지 않은 [이메일주소]이거나 [비밀번호]가 올바르지 않습니다.',
      });
    }

    const ip = ip2long(
      (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress,
    );
    const date = new Date();
    const kstFormatter = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(date.getTime() + offset);

    const logDate = kstFormatter.format(date);
    const startDate = new Date(logDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(logDate);
    endDate.setHours(23, 59, 59, 999);

    // const ua = useragent.parse(req.headers['user-agent']);

    // 로그 기록 확인
    const memLogexists = await this.knex('wb_member_log')
      .where('mem_idx', user.mem_idx)
      .whereBetween('mlg_regtime', [startDate, endDate])
      .first();

    if (!memLogexists) {
      await this.knex('wb_member_log').insert({
        mem_idx: user.mem_idx,
        mem_auth: user.mem_auth,
        mlg_ip: ip,
        mlg_regtime: new Date(koreaNow),
        // mlg_browser: ua.browser,
        // mlg_version: ua.version,
        // mlg_platform: ua.os,
        // mlg_is_mobile: ua.isMobile || ua.browser === 'Dart' ? 'Y' : 'N',
      });
    }

    const tokens = await this.createResponseToken(user);

    await this.knex('wb_login_log').where('lg_userid', user.mem_idx).del();

    await this.knex('wb_login_log').insert({
      lg_userid: user.mem_idx,
      lg_access_token: tokens.accessToken,
      lg_ip: ip,
    });

    return tokens;
  }

  private async createResponseToken(user: any) {
    const accessToken = jwt.sign({ id: user.mem_idx }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { accessToken };
  }
}
