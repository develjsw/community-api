import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { POST_COMMAND_REPOSITORY } from './interface/command/post-repository-command.interface';
import { CreatePostCommand } from './repository/command/create-post.command';
import { POST_QUERY_REPOSITORY } from './interface/query/post-repository-query.interface';
import { GetPostQuery } from './repository/query/get-post.query';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [
        PostService,
        {
            provide: POST_COMMAND_REPOSITORY,
            useClass: CreatePostCommand
        },
        {
            provide: POST_QUERY_REPOSITORY,
            useClass: GetPostQuery
        }
    ],
    exports: [POST_COMMAND_REPOSITORY]
})
export class PostModule {}
