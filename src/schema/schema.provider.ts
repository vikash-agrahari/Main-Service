import { Connection } from 'mongoose';
import { ClientSchema } from './client.schema';
import { Logchema } from './log.schema';
import { TransactionSchema } from './transaction.schema';
import { OrderSchema } from './order.schema';
import { ENUM } from 'src/common/enum';
import { UserSessionSchema } from './userSession.schema';
import { AdminSchema } from './admin.schema';
import { AdminSessionSchema } from './adminSession.schema';

export const schemaProviders = [
  {
    provide: 'CLIENT_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.CLIENT, ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'LOG_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.LOG, Logchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TRANSACTION_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.TRANSACTION, TransactionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model(ENUM.COLLECTIONS.ORDER, OrderSchema),
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
