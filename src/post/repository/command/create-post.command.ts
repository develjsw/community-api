import { Injectable } from '@nestjs/common';
import { PostRepositoryCommandInterface } from '../../interface/command/post-repository-command.interface';
import { PostEntity } from '../../entity/post.entity';
import { PrismaMasterClientService } from '../../../common/prisma/service/prisma-master-client.service';

@Injectable()
export class CreatePostCommand implements PostRepositoryCommandInterface {
    constructor(private readonly prisma: PrismaMasterClientService) {}

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
