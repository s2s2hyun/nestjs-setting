import * as crypto from 'crypto';

const SECRET_KEY = 'secret'; // 또는 process.env.SECRET_KEY 사용 추천

export function getHasString(str: string): string {
  // MD5 해시 생성
  const md5Hash = crypto
    .createHash('md5')
    .update(SECRET_KEY + str)
    .digest('hex');

  // SHA256 해시로 변환
  const sha256Hash = crypto.createHash('sha256').update(md5Hash).digest('hex');

  return sha256Hash;
}
