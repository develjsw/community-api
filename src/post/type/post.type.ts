export type PostType = {
    postId: number | null;
    boardId: number;
    memberId: number;
    title: string;
    content: string;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
