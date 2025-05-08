import { PostEntity } from '../../entity/post.entity';

export const POST_COMMAND_REPOSITORY = Symbol('PostRepositoryCommandInterface');

export interface PostRepositoryCommandInterface {
    createPost(post: PostEntity): Promise<PostEntity>;
}
