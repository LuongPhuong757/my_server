export enum ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export const jwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expired: process.env.JWT_EXPIRED_TOKEN,
};