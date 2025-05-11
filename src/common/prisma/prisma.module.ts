import { Global, Module } from '@nestjs/common';
import { PrismaMasterClientService } from './service/prisma-master-client.service';
import { PrismaSlaveClientService } from './service/prisma-slave-client.service';

@Global()
@Module({
    providers: [PrismaMasterClientService, PrismaSlaveClientService],
    exports: [PrismaMasterClientService, PrismaSlaveClientService]
})
export class PrismaModule {}
