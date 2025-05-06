import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService],
    exports: []
})
export class PostModule {}
