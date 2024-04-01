export enum RoleEnum {
  WORKER = 'worker',
  BOSS = 'boss',
  ADMIN = 'admin',
}

export enum RedisKeys{
  USERS = 'users',
  PRODUCTS = 'products',
  TRANSACTIONS = 'transactions',
  USER_BY_ID = 'user_by_id',
}

export enum Status{
  DEBIT= 'debit',
  CREDIT = 'credit',
}

export enum StatusTrack{
  CREATED = 'created',
  PROGRESS = 'progress',
  DONE = 'done',
}
