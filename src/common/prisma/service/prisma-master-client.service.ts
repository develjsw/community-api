import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma-master-client';
import { PrismaMasterClientInterface } from '../interface/prisma-master-client.interface';

@Injectable()
export class PrismaMasterClientService extends PrismaClient implements OnModuleInit, PrismaMasterClientInterface {
    constructor() {
        super({
            datasources: {
                db: {
                    url: process.env.MASTER_DATABASE_URL
                }
            },
            log: ['query', 'info', 'warn', 'error']
        });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async runInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.$transaction((tx: Prisma.TransactionClient) => callback(tx));
    }
}
