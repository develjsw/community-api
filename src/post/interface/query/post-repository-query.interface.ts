import { PostEntity } from '../../entity/post.entity';

export const POST_QUERY_REPOSITORY = Symbol('PostRepositoryQueryInterface');

export interface PostRepositoryQueryInterface {
    findPost(postId: number): Promise<PostEntity | null>;
}
