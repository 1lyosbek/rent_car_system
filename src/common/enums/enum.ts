export enum RoleEnum {
  CLIENT = 'client',
  OWNER = 'owner',
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
}

export enum RedisKeys {
  USERS = 'users',
  CLIENTS = 'clients',
  TRANSACTIONS = 'transactions',
  USER_BY_ID = 'user_by_id',
}

export enum Status {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum StatusTrack {
  CREATED = 'created',
  PROGRESS = 'progress',
  DONE = 'done',
}
