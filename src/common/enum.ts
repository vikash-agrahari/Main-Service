export const ENUM = {
  COLLECTIONS: {
    USER: 'user',
    LOG:'log',
    TRANSACTION:'transaction',
    ORDER:'order',
    USER_SESSION:'userSession',
    ADMIN:'admin',
    ADMIN_SESSION:'adminSession'
  },

  ORDER_STATUS: {
    PENDING: 1,
    INITIATED: 2,
    CANCELLED: 3,
    ABANDONED: 3,
    FAILED: 3,
    DECLINED: 3,
    RESTRICTED: 3,
    VOID: 3,
    TIMEOUT: 3,
    UNKNOWN: 3,
    CAPTURED: 4,
  },

  TRANSACTION_STATUS :{
    PENDING: 'PENDING',
    INITIATED: 'INITIATED',
    ABANDONED: 'ABANDONED',
    CANCELLED: 'CANCELLED',
    FAILED: 'FAILED',
    DECLINED: 'DECLINED',
    RESTRICTED: 'RESTRICTED',
    CAPTURED: 'CAPTURED',
    VOID: 'VOID',
    TIMEOUT: 'TIMEOUT',
    UNKNOWN: 'UNKNOWN',
  },
  

  USER_PROFILE_STATUS: {
    ACTIVE: 1,
    BLOCKED: 4,
    DELETED: 3,
    LOGOUT: 2,
  },
   
  GENDER: {
    FEMALE: 1,
    MALE: 2,
    Other: 3
  }
};
