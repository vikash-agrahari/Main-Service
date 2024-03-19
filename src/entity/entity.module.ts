import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/providers/database/db.module';
import { schemaProviders } from 'src/schema/schema.provider';
import { UserEntity } from './user.entity';
import { UserSessionEntity} from './userSession.entity';
import { AdminEntity } from './admin.entity';
import { AdminSessionEntity } from './adminSession.entity';

@Module({
  imports: [DatabaseModule],
  providers: [...schemaProviders, UserEntity,UserSessionEntity,AdminEntity,AdminSessionEntity],
  exports: [UserEntity,UserSessionEntity,AdminEntity,AdminSessionEntity],
})
export class EntityModule {}
