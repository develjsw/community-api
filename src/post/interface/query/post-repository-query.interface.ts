import { PostType } from '../../type/post.type';

export const POST_QUERY_REPOSITORY = Symbol('PostRepositoryQueryInterface');

export interface PostRepositoryQueryInterface {
    findPost(postId: number): Promise<PostType | null>;
}
