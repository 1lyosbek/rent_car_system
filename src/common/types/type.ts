export type ID = number;

export interface IConfig {
  port: number;
  redis_host: string;
  redis_port: number;
  database: string;
  database_user: string;
  database_password: string;
  database_host: string;
  database_port: number;
}

export interface ICarInfo {
  color: string;
  max_speed: number;
  number_of_seats: number;
}
