import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserOtp } from "entities/user-otp-code.entity"
import { User } from "entities/user.entity"
import { OTP_TYPE, STATUS_OTP } from "src/user-otp/constant"
import { UserOtpService } from "src/user-otp/user-otp.service"
import { UserService } from "src/user/user.service"
import { Repository } from "typeorm"
import { ROLE } from "./constants"
import { SignupDto } from "./dtos/signup.dto"
import { compare, hash } from 'bcrypt'
import { JwtService } from "@nestjs/jwt"
import { AuthTokenOutput } from "./dtos/auth-token-output.dto"
import { plainToClass } from "class-transformer"
import { UserOutput } from "src/user/dto/user-output.dto"
import { UserTokenService } from "src/user-token/user-token.service"
import { OAuth2Client } from 'google-auth-library'
import { CreatePasswordDto } from "./dtos/create-password.dto"

export interface JWTPayload {
  sub: number;
  username: string;
  walletType: number;
  nonce: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserOtp)
    private readonly userOtpRepository: Repository<UserOtp>,
    private readonly userOtpService: UserOtpService,
    private jwtService: JwtService,
    private readonly userTokenService: UserTokenService
  ) { }

  async signup(dto: SignupDto): Promise<User> {
    const user = await this.userService.findByEmail(dto.email)
    if (user) {
      throw new BadRequestException('Email already exists')
    }

    await this.userOtpService.verifyOtp({
      otp: dto.otp,
      email: dto.email,
      otpType: OTP_TYPE.SIGN_UP
    })

    const hashedPassword = await hash(dto.password, 10)
    if (!user) {
      return await this.userRepository.save({
        email: dto.email,
        roles: [ROLE.USER],
        password: hashedPassword,
        userName: dto.userName
      })
    }
    return user
  }

  async getUserProfile(id: number) {
    const user = await this.userRepository.findOne(id)
    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.userName,
      sub: user.id,
      roles: user.roles,
      email: user.email
    }
    let subject = { sub: user.id }
    const authToken = {
      refreshToken: this.jwtService.sign(subject),
      accessToken: this.jwtService.sign(
        {
          ...payload,
          ...subject
        }
      )
    }

    return authToken
  }

  async getUser(email: string, password: string): Promise<User> {
    const user = await this.findUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException('email_does_not_exist')
    }
    const match = await compare(password, user.password)
    if (!match)
      throw new UnauthorizedException(
        'incorrect_email_password'
      )

    return user
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userService.findByEmail(email)
    return user
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token)
  }

  async refreshToken(
    user: User
  ): Promise<AuthTokenOutput> {
    const _user = await this.userService.findById(user.id)
    if (!_user) {
      throw new UnauthorizedException('Invalid user id')
    }

    return this.getAuthToken(user)
  }

  async getAuthToken(
    user: User,
  ): Promise<AuthTokenOutput> {
    const subject = { sub: user.id }
    const payload = {
      username: user.userName,
      sub: user.id,
      roles: user.roles
    }

    const expiredIn =
      new Date().getTime() / 1000 + 1000;
    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: 100000000
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: 100000 }
      )
    }

    const dataUserToken = {
      userId: user.id,
      token: authToken.accessToken,
      expiredIn
    }
    await this.userTokenService.saveTokenDevice(dataUserToken)
    return plainToClass(AuthTokenOutput, authToken, {
      excludeExtraneousValues: true
    })
  }

  async registerByGoogle(token: string) {
    const client = new OAuth2Client(process.env.REACT_APP_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '933642933757-t9cu95m3g5p25d0r4oqnc8jt3eddoq6e.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();
    let user = await this.userService.findByEmail(email)
    if (!user) {
      user = await this.userRepository.save({
        email: email,
        roles: [ROLE.USER],
        password: '',
        avatar: picture,
        userName: name
      })
    }

    const dataToken = await this.login(user);
    return { data: { ...dataToken, user }, meta: {} }
  }

  async createPassword(dto: CreatePasswordDto): Promise<User> {
    const user = await this.userService.findByEmail(dto.email)
    if (!user) {
      throw new BadRequestException('email_does_not_exist')
    }
    const otpCode = await this.userOtpRepository.findOne({
      where: {
        email: dto.email,
        type: OTP_TYPE.SIGN_UP,
        status: STATUS_OTP.VERIFIED
      },
      order: {
        createdAt: 'DESC'
      }
    })
    const FIVE_MINUTES_IN_SECOND = 300
    if (!otpCode || otpCode.code !== dto.otp) {
      throw new BadRequestException('invalid_code')
    }
    if (
      new Date().getTime() / 1000 >
      otpCode.expiredAt + FIVE_MINUTES_IN_SECOND
    ) {
      throw new BadRequestException('otp_expired')
    }
    const hashedPassword = await hash(dto.password, 10)
    const updatedUSer = await this.userRepository.save({
      ...user,
      password: hashedPassword,
      isCreatedPassword: true
    })
    const auth = await this.login(user)
    return plainToClass(User, {
      email: updatedUSer.email,
      roles: updatedUSer.roles,
      accessToken: auth.accessToken,
      refreshToken: auth.refreshToken
    })
  }
}
