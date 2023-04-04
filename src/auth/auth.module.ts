import { CacheModule, Global, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOtp } from "entities/user-otp-code.entity";
import { User } from "entities/user.entity";
import { UserOtpModule } from "src/user-otp/user-otp.module";
import { UserTokenModule } from "src/user-token/user-token.module";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtRefreshStrategy } from "./strategies/jwt-refresh.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Global()
@Module({
  imports: [
    // CacheModule.register(),
    TypeOrmModule.forFeature([
    User,UserOtp
  ]),
  {
    ...JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRED_TOKEN_AFTER },
    }),
    global: true,
  },
  PassportModule.register({ defaultStrategy: 'jwt' }),
    UserOtpModule,
    UserModule,
    UserTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy, JwtRefreshStrategy,],
  exports: [AuthService]
})
export class AuthModule { }
