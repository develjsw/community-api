import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    boardId: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    memberId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;
}
