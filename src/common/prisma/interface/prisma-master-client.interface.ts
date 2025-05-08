import { Prisma } from '@prisma-master-client';

export const PRISMA_MASTER_CLIENT = Symbol('PrismaMasterClientInterface');

export interface PrismaMasterClientInterface {
    post: Prisma.postDelegate;
    comment: Prisma.commentDelegate;

    runInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T>
}
