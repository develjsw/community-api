import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../service/post.service';
import { PostEntity } from '../entity/post.entity';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() dto: CreatePostDto): Promise<void> {
        await this.postService.createPost(dto);
    }

    @Get(':postId')
    async getPost(@Param('postId', ParseIntPipe) postId: number): Promise<PostEntity> {
        return await this.postService.getPost({ postId });
    }
}
