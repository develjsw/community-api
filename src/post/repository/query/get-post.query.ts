import { Injectable } from '@nestjs/common';
import { PrismaSlaveClientService } from '../../../common/prisma/service/prisma-slave-client.service';
import { PostRepositoryQueryInterface } from '../../interface/query/post-repository-query.interface';
import { PostEntity } from '../../entity/post.entity';
import { PostMapper } from '../../mapper/post.mapper';

@Injectable()
export class GetPostQuery implements PostRepositoryQueryInterface {
    constructor(private readonly prisma: PrismaSlaveClientService) {}

    async findPost(postId: number): Promise<PostEntity | null> {
        const findResult = await this.prisma.post.findUnique({
            where: {
                post_id: postId
            }
        });

        return findResult ? PostMapper.toEntity(findResult) : null;
    }
}
