import { Injectable } from '@nestjs/common';
import { PostRepositoryInterface } from '../../../domain/repository/post.repository.interface';
import { PrismaMasterClientService } from '../../database/prisma/master/prisma-master-client.service';
import { PostEntity } from '../../../domain/entity/post.entity';

@Injectable()
export class PrismaPostRepository implements PostRepositoryInterface {
    constructor(private readonly prisma: PrismaMasterClientService) {}

    async create(entity: PostEntity): Promise<PostEntity> {
        const result = await this.prisma.post.create({
            data: {
                board_id: entity.boardId,
                member_id: entity.memberId,
                title: entity.title,
                content: entity.content,
                view_count: entity.viewCount,
                created_at: entity.createdAt,
                updated_at: entity.updatedAt,
                deleted_at: null
            }
        });

        return new PostEntity(
            result.post_id,
            result.board_id,
            result.member_id,
            result.title,
            result.content,
            result.view_count,
            result.created_at,
            result.updated_at,
            result.deleted_at
        );
    }
}
