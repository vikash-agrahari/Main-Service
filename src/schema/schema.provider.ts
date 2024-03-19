import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { ENUM } from 'src/common/enum';
import { UserSessionSchema } from './userSession.schema';
import { AdminSchema } from './admin.schema';
import { AdminSessionSchema } from './adminSession.schema';

export const schemaProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.USER, UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'USER_SESSION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.USER_SESSION, UserSessionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ADMIN_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.ADMIN, AdminSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ADMIN_SESSION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.ADMIN_SESSION, AdminSessionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
