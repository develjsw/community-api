import { Injectable } from '@nestjs/common';
import { PostRepositoryCommandInterface } from '../../interface/command/post-repository-command.interface';
import { PostEntity } from '../../entity/post.entity';
import { PrismaMasterClientService } from '../../../common/prisma/service/prisma-master-client.service';
import { PostMapper } from '../../mapper/post.mapper';

@Injectable()
export class CreatePostCommand implements PostRepositoryCommandInterface {
    constructor(private readonly prisma: PrismaMasterClientService) {}

    async createPost(data: PostEntity): Promise<PostEntity> {
        const createResult = await this.prisma.post.create({
            data: PostMapper.toPrismaCreateInput(data)
        });

        return PostMapper.toEntity(createResult);
    }
}
