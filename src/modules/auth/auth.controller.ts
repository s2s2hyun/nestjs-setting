import { Controller, Post, Body, Req, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// DTO 클래스 정의
import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '로그인 아이디(이메일)',
  })
  loginId: string;

  @ApiProperty({
    example: 'password123',
    description: '비밀번호',
  })
  loginPass: string;
}

export class AuthorizeResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT 액세스 토큰',
  })
  accessToken: string;
  message?: string;
}

@ApiTags('인증') // Swagger에서 보여질 그룹 이름
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인 API' })
  @ApiBody({ type: AuthorizeDto })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: AuthorizeResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: '로그인 실패',
    schema: {
      example: {
        code: 'AUTH.ERR003',
        error: '[이메일주소]를 입력하세요.',
      },
    },
  })
  @Post('authorize')
  @HttpCode(200)
  async authorize(
    @Body() authDto: AuthorizeDto, // DTO 타입 사용
    @Req() req: Request<ParamsDictionary, any, any, ParsedQs>,
  ) {
    return this.authService.authorize(authDto, req);
  }
}
