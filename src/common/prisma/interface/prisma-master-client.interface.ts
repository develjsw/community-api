import { Prisma } from '@prisma-master-client';

export const PRISMA_MASTER_CLIENT = Symbol('PrismaMasterClientInterface');

// TODO: ORM 추상화는 오버엔지니어링일 수 있어서 빼는 방향도 고려
export interface PrismaMasterClientInterface {
    post: Prisma.postDelegate;
    comment: Prisma.commentDelegate;

    runInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T>;
}
