import { Module } from '@nestjs/common';
import { UploadsController } from '@/modules/uploads/uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService], // UploadService를 제공
})
export class UploadsModule {}
