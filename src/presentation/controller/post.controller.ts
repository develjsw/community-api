import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostUseCase } from '../../application/post/use-case/create-post.use-case';
import { CreatePostDto } from '../dto/create-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly createPostUseCase: CreatePostUseCase) {}

    @Post()
    async createPost(@Body() dto: CreatePostDto) {
        const { boardId, memberId, title, content } = dto;

        const result = await this.createPostUseCase.execute({
            boardId,
            memberId,
            title,
            content
        });

        return { postId: result.postId };
    }
}
