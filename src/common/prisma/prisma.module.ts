import { Global, Module } from '@nestjs/common';
import { PrismaMasterClientService } from './service/prisma-master-client.service';

@Global()
@Module({
    providers: [PrismaMasterClientService],
    exports: [PrismaMasterClientService]
})
export class PrismaModule {}
