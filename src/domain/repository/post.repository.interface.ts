import { PostEntity } from '../entity/post.entity';

export const POST_REPOSITORY = Symbol('POST_REPOSITORY');

export interface PostRepositoryInterface {
    create(post: PostEntity): Promise<PostEntity>;
}
