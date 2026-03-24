import "dotenv/config";
import { Injectable, OnModuleInit, Logger, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private prismaClient: InstanceType<typeof PrismaClient>;
  private logger = new Logger('PrismaService');

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;
    this.prismaClient = new PrismaClient({
      adapter: new PrismaPg({
        connectionString: databaseUrl,
      }),
    } as any);
  }

  async onModuleInit() {
    try {
      if (this.prismaClient && typeof this.prismaClient.$connect === 'function') {
        await this.prismaClient.$connect();
        this.logger.log('✅ Connected to database!');
      }
    } catch (error: any) {
      this.logger.warn('⚠️  Could not connect to database (this is OK for development): ' + error.message);
    }
  }

  async onModuleDestroy() {
    try {
      if (this.prismaClient && typeof this.prismaClient.$disconnect === 'function') {
        await this.prismaClient.$disconnect();
      }
    } catch (error: any) {
      // Ignore disconnect errors
    }
  }

  get task() {
    return this.prismaClient?.task;
  }

  $connect() {
    return this.prismaClient?.$connect?.();
  }

  $disconnect() {
    return this.prismaClient?.$disconnect?.();
  }

  $queryRaw(sql: any, ...values: any[]) {
    return this.prismaClient?.$queryRaw?.(sql, ...values);
  }

  $executeRaw(sql: any, ...values: any[]) {
    return this.prismaClient?.$executeRaw?.(sql, ...values);
  }
}