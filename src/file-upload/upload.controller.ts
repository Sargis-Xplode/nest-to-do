import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";

@Controller("file")
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post("upload")
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return await this.uploadService.uploadFile(file);
    }
}