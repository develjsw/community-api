import { Global, Module } from '@nestjs/common';
import { PrismaMasterClientService } from './service/prisma-master-client.service';
import { PRISMA_MASTER_CLIENT } from './interface/prisma-master-client.interface';

@Global()
@Module({
    providers: [
        {
            provide: PRISMA_MASTER_CLIENT,
            useClass: PrismaMasterClientService
        }
    ],
    exports: [PRISMA_MASTER_CLIENT]
})
export class PrismaModule {}
