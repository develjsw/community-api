import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { POST_COMMAND_REPOSITORY } from './interface/command/post-repository-command.interface';
import { CreatePostCommand } from './repository/command/create-post.command';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [
        PostService,
        {
            provide: POST_COMMAND_REPOSITORY,
            useClass: CreatePostCommand
        }
    ],
    exports: [POST_COMMAND_REPOSITORY]
})
export class PostModule {}
