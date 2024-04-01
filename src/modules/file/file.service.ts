import { Inject, Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { FileEntity } from './entities/file.entity';
import { FileRepository } from './file.repository';
import { ResData } from 'src/lib/resData';
import { ID } from 'src/common/types/type';
import { FileNotFound } from './exception/file.exception';
import { unlinkSync } from 'fs';

@Injectable()
export class FileService {
  constructor(@Inject("IFileRepository") private readonly fileRepository: FileRepository) {}
  async create(file: Express.Multer.File, createFileDto: CreateFileDto): Promise<ResData<FileEntity>> {
    const newFile = new FileEntity();
    newFile.url = file.path;
    newFile.mimetype = file.mimetype;
    newFile.size = file.size;
    const created = await this.fileRepository.create(newFile)
    return new ResData<FileEntity>("file created", 201, created)
  }

  async findAll(): Promise<ResData<FileEntity[]>> {
    const res = await this.fileRepository.findAll();
    return new ResData<FileEntity[]>("all files", 200, res)
  }

  async findOne(id: ID): Promise<ResData<FileEntity>> {
    const foundFile = await this.fileRepository.findOneById(id)
    if (!foundFile) {
      throw new FileNotFound()
    }
    return new ResData<FileEntity>("file found", 200, foundFile);
  }

  async remove(id: ID): Promise<ResData<FileEntity>> {
    await this.findOne(id)
    const deleted = await this.fileRepository.delete(id);
    const deleteFromFile =  unlinkSync(deleted.url);
    return new ResData<FileEntity>("file deleted", 200, deleted );
  }
}
