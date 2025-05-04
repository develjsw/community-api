import { Module } from '@nestjs/common';
import { PrismaMasterClientService } from './prisma-master-client.service';

@Module({
    providers: [PrismaMasterClientService],
    exports: [PrismaMasterClientService]
})
export class PrismaMasterModule {}
