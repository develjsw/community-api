export class PostEntity {
    constructor(
        public readonly postId: number | null,
        public readonly boardId: number,
        public readonly memberId: number,
        public readonly title: string,
        public readonly content: string,
        public readonly viewCount: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date | null,
        public readonly deletedAt: Date | null
    ) {}

    static create(input: {
        boardId: number;
        memberId: number;
        title: string;
        content: string;
        viewCount?: number;
    }): PostEntity {
        return new PostEntity(
            null,
            input.boardId,
            input.memberId,
            input.title,
            input.content,
            input.viewCount ?? 0,
            new Date(),
            null,
            null
        );
    }
}
