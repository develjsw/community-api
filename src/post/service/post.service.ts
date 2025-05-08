import { Inject, Injectable } from '@nestjs/common';
import {
    POST_COMMAND_REPOSITORY,
    PostRepositoryCommandInterface
} from '../interface/command/post-repository-command.interface';
import { PostEntity } from '../entity/post.entity';

@Injectable()
export class PostService {
    constructor(
        @Inject(POST_COMMAND_REPOSITORY)
        private readonly postCommand: PostRepositoryCommandInterface
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
}
