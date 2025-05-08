import { Injectable } from '@nestjs/common';
import { PrismaSlaveClientInterface } from '../interface/prisma-slave-client.interface';

@Injectable()
export class PrismaSlaveClientService implements PrismaSlaveClientInterface {
    constructor() {}
}
