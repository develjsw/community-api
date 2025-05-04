export class PostEntity {
    constructor(
        public readonly postId: number | null,
        public readonly boardId: number,
        public readonly memberId: number,
        public readonly title: string,
        public readonly content: string,
        public readonly viewCount: number = 0,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date | null = null
    ) {}
}
