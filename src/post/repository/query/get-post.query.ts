import { Injectable } from '@nestjs/common';
import { PrismaSlaveClientService } from '../../../common/prisma/service/prisma-slave-client.service';
import { PostRepositoryQueryInterface } from '../../interface/query/post-repository-query.interface';
import { CaseConverter } from '../../../common/util/case/case-converter';
import { PostType } from '../../type/post.type';

@Injectable()
export class GetPostQuery implements PostRepositoryQueryInterface {
    constructor(private readonly prisma: PrismaSlaveClientService) {}

    async findPost(postId: number): Promise<PostType | null> {
        const findResult = await this.prisma.post.findUnique({
            where: {
                post_id: postId
            }
        });

        if (!findResult) {
            return null;
        }

        const camelCased = CaseConverter.snakeToCamel(findResult);

        return {
            postId: camelCased.postId,
            boardId: camelCased.boardId,
            memberId: camelCased.memberId,
            title: camelCased.title,
            content: camelCased.content,
            viewCount: camelCased.viewCount,
            createdAt: camelCased.createdAt,
            updatedAt: camelCased.updatedAt,
            deletedAt: camelCased.deletedAt
        };
    }
}
