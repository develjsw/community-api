import { PostType } from '../../type/post.type';

export const POST_COMMAND_REPOSITORY = Symbol('PostRepositoryCommandInterface');

export interface PostRepositoryCommandInterface {
    createPost(post: Omit<PostType, 'postId' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<PostType>;
}
