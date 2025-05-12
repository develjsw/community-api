import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
    POST_COMMAND_REPOSITORY,
    PostRepositoryCommandInterface
} from '../interface/command/post-repository-command.interface';
import {
    POST_QUERY_REPOSITORY,
    PostRepositoryQueryInterface
} from '../interface/query/post-repository-query.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostType } from '../type/post.type';

@Injectable()
export class PostService {
    constructor(
        @Inject(POST_COMMAND_REPOSITORY)
        private readonly postCommand: PostRepositoryCommandInterface,

        @Inject(POST_QUERY_REPOSITORY)
        private readonly postQuery: PostRepositoryQueryInterface
    ) {}

    async createPost(dto: CreatePostDto): Promise<void> {
        await this.postCommand.createPost(dto);
    }

    async getPost(postId: number): Promise<PostType> {
        const post: PostType | null = await this.postQuery.findPost(postId);
        if (!post) {
            throw new NotFoundException('게시글이 존재하지 않습니다.');
        }

        return post;
    }
}
