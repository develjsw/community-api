import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY, PostRepositoryInterface } from '../../../domain/repository/post.repository.interface';
import { PostEntity } from '../../../domain/entity/post.entity';

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(POST_REPOSITORY)
        private readonly postRepository: PostRepositoryInterface
    ) {}

    async execute(command: { boardId: number; memberId: number; title: string; content: string }): Promise<PostEntity> {
        const now = new Date();

        const post = new PostEntity(
            null,
            command.boardId,
            command.memberId,
            command.title,
            command.content,
            0,
            now,
            now,
            null
        );

        return await this.postRepository.create(post);
    }
}
