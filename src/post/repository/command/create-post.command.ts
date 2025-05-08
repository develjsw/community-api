import { Inject, Injectable } from '@nestjs/common';
import { PostRepositoryCommandInterface } from '../../interface/command/post-repository-command.interface';
import { PostEntity } from '../../entity/post.entity';
import {
    PRISMA_MASTER_CLIENT,
    PrismaMasterClientInterface
} from '../../../common/prisma/interface/prisma-master-client.interface';

@Injectable()
export class CreatePostCommand implements PostRepositoryCommandInterface {
    constructor(
        @Inject(PRISMA_MASTER_CLIENT)
        private readonly prisma: PrismaMasterClientInterface
    ) {}

    async createPost(data: PostEntity): Promise<PostEntity> {
        const { boardId, memberId, title, content, viewCount } = data;

        const createResult = await this.prisma.post.create({
            data: {
                board_id: boardId,
                member_id: memberId,
                title,
                content,
                view_count: viewCount
            }
        });

        // TODO : Mapper 파일 생성하여 적용하기
        return new PostEntity(
            createResult.post_id,
            createResult.board_id,
            createResult.member_id,
            createResult.title,
            createResult.content,
            createResult.view_count,
            createResult.created_at,
            createResult.updated_at,
            createResult.deleted_at
        );
    }
}
