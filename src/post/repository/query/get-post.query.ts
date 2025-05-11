import { Injectable } from '@nestjs/common';
import { PrismaSlaveClientService } from '../../../common/prisma/service/prisma-slave-client.service';
import { PostRepositoryQueryInterface } from '../../interface/query/post-repository-query.interface';
import { PostEntity } from '../../entity/post.entity';

@Injectable()
export class GetPostQuery implements PostRepositoryQueryInterface {
    constructor(private readonly prisma: PrismaSlaveClientService) {}

    async findPost(postId: number): Promise<PostEntity | null> {
        const findResult = await this.prisma.post.findUnique({
            where: {
                post_id: postId
            }
        });

        return findResult
            ? new PostEntity(
                  findResult.post_id,
                  findResult.board_id,
                  findResult.member_id,
                  findResult.title,
                  findResult.content,
                  findResult.view_count,
                  findResult.created_at,
                  findResult.updated_at,
                  findResult.deleted_at
              )
            : null;
    }
}
