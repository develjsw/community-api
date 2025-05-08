import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostService } from '../service/post.service';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() dto: CreatePostDto): Promise<void> {
        await this.postService.createPost(dto);
    }
}
