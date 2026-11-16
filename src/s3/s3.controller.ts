import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadDto } from './dto/upload.dto';

@ApiTags('S3')
@Controller('upload')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @ApiBody({ type: UploadDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.s3Service.uploadFile(file);
  }
}