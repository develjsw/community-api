import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
    POST_COMMAND_REPOSITORY,
    PostRepositoryCommandInterface
} from '../interface/command/post-repository-command.interface';
import { PostEntity } from '../entity/post.entity';
import {
    POST_QUERY_REPOSITORY,
    PostRepositoryQueryInterface
} from '../interface/query/post-repository-query.interface';

@Injectable()
export class PostService {
    constructor(
        @Inject(POST_COMMAND_REPOSITORY)
        private readonly postCommand: PostRepositoryCommandInterface,

        @Inject(POST_QUERY_REPOSITORY)
        private readonly postQuery: PostRepositoryQueryInterface
    ) {}

    async createPost(input: {
        boardId: number;
        memberId: number;
        title: string;
        content: string;
        viewCount?: number;
    }): Promise<void> {
        const entity = PostEntity.create(input);

        await this.postCommand.createPost(entity);
    }

    async getPost(input: { postId: number }): Promise<PostEntity> {
        const post: PostEntity = await this.postQuery.findPost(input.postId);
        if (!post) {
            throw new NotFoundException('게시글이 존재하지 않습니다.');
        }

        return post;
    }
}
