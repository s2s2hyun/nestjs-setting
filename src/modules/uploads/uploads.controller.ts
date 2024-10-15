import {
  Controller,
  Post,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as randomstring from 'randomstring';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadService: UploadsService) {}

  @Post(':directory')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const directory = req.params.directory || 'default';
          const uploadPath = `uploads/${directory}`;
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const fileName = `${Date.now()}-${randomstring.generate(7)}${ext}`;
          cb(null, fileName);
        },
      }),
    }),
  )
  uploadFiles(
    @Param('directory') directory: string,
    @UploadedFiles() files: Array<Express.Multer.File> = [],
  ) {
    const fileInfos = files.map((file) => ({
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    }));

    return { message: 'Files uploaded successfully!', files: fileInfos };
  }
}
