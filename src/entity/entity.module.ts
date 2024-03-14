import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/schema/schema.provider';
import { UserEntity } from './user.entity';
import { LogEntity} from './log.entity';
import { TransactionEntity} from './transaction.entity';
import { OrderEntity} from './order.entity';
import { UserSessionEntity} from './userSession.entity';
import { AdminEntity } from './admin.entity';
import { AdminSessionEntity } from './adminSession.entity';

@Module({
  imports: [DatabaseModule],
  providers: [...schemaProviders, UserEntity,LogEntity,TransactionEntity,OrderEntity,UserSessionEntity,AdminEntity,AdminSessionEntity],
  exports: [UserEntity,LogEntity,TransactionEntity,OrderEntity,UserSessionEntity,AdminEntity,AdminSessionEntity],
})
export class EntityModule {}
