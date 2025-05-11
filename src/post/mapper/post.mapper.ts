import { PostEntity } from '../entity/post.entity';
import { post as S_POST } from '@prisma-slave-client';
import { Prisma as PrismaMaster } from '@prisma-master-client';

export class PostMapper {
    // Prisma → Entity
    static toEntity(model: S_POST): PostEntity {
        return new PostEntity(
            model.post_id,
            model.board_id,
            model.member_id,
            model.title,
            model.content,
            model.view_count,
            model.created_at,
            model.updated_at,
            model.deleted_at
        );
    }

    // Entity → Prisma Create DTO
    static toPrismaCreateInput(entity: PostEntity): PrismaMaster.postCreateInput {
        return {
            board_id: entity.boardId,
            member_id: entity.memberId,
            title: entity.title,
            content: entity.content,
            view_count: entity.viewCount
        };
    }
}
