import { Module } from '@nestjs/common';
import { PrismaMasterModule } from '../../infrastructure/database/prisma/master/prisma-master.module';
import { PostController } from '../controller/post.controller';
import { CreatePostUseCase } from '../../application/post/use-case/create-post.use-case';
import { PrismaPostRepository } from '../../infrastructure/post/repository/prisma-post.repository';
import { POST_REPOSITORY } from '../../domain/repository/post.repository.interface';

@Module({
    imports: [PrismaMasterModule],
    controllers: [PostController],
    providers: [
        CreatePostUseCase,
        {
            provide: POST_REPOSITORY,
            useClass: PrismaPostRepository
        }
    ],
    exports: []
})
export class PostModule {}
