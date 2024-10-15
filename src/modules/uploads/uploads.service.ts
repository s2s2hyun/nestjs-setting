import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as md5 from 'md5';
import * as randomstring from 'randomstring';

@Injectable()
export class UploadsService {
  // Multer Storage 설정 반환
  getStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const directory = req.params.directory || 'default';
        const uploadDir = path.join(__dirname, '..', 'uploads', directory);

        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const fileName =
          md5(`${Date.now()}_${file.originalname}`) +
          randomstring.generate(5) +
          ext;
        cb(null, fileName);
      },
    });
  }
}
