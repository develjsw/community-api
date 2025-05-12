import { Injectable } from '@nestjs/common';
import { PostRepositoryCommandInterface } from '../../interface/command/post-repository-command.interface';
import { PrismaMasterClientService } from '../../../common/prisma/service/prisma-master-client.service';
import { CaseConverter } from '../../../common/util/case/case-converter';
import { PostType } from '../../type/post.type';

@Injectable()
export class CreatePostCommand implements PostRepositoryCommandInterface {
    constructor(private readonly prisma: PrismaMasterClientService) {}

    async createPost(data: Omit<PostType, 'postId' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<PostType> {
        const { boardId, memberId, title, content, viewCount } = data;

        const createResult = await this.prisma.post.create({
            data: {
                ...(boardId && { board_id: boardId }),
                ...(memberId && { member_id: memberId }),
                ...(title && { title }),
                ...(content && { content }),
                ...(viewCount && { view_count: viewCount }),
                created_at: new Date()
            }
        });

        const camelCased = CaseConverter.snakeToCamel(createResult);

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
