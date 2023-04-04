import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { AuthGuard } from "@nestjs/passport"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
// import { Cache } from "cache-manager"
import { User } from "entities/user.entity"
import { BaseApiResponse, SwaggerBaseApiResponse } from "src/shared/dtos/base-api-response.dto"
import { AuthService } from "./auth.service"
import { UserScope } from "./decorators/user.decorator"
import { LoginInput } from "./dtos/auth-login-input.dto"
import { AuthTokenOutput } from "./dtos/auth-token-output.dto"
import { BaseApiErrorResponse } from "./dtos/base-api-response.dto"
import { CreatePasswordDto } from "./dtos/create-password.dto"
import { SignupDto } from "./dtos/signup.dto"
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard"


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('healh-check')
  @ApiOperation({
    summary: 'User signup first step API'
  })
  async HealhCheck(
    @Body() dto: SignupDto
  ){
    const {userName} = dto
    // const registeredUser = await this.authService.signup(dto)
    if (userName == '1') return 'oke 1'
    // return { data: registeredUser, meta: {} }
    console.log("Feature 1")
    console.log("Feature 2")
    return 'oke'
  }

  @Post('test')
  @ApiOperation({
    summary: 'User signup first step API'
  })
  async Test(
  ){
   console.log('this')
    // return await this.cacheManager.get('custom_key')
  }

  @Post('signup')
  @ApiOperation({
    summary: 'User signup first step API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(User)
  })
  async signupFirstStep(
    @Body() dto: SignupDto
  ): Promise<BaseApiResponse<User>> {
    const registeredUser = await this.authService.signup(dto)
    return { data: registeredUser, meta: {} }
  }


  @Post('google-auth')
  @ApiOperation({
    summary: 'User signup first step API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(User)
  })
  async loginGoogle(
    @Body('token') token: string
  ){  
    const dataToken = await this.authService.registerByGoogle(token)
    return dataToken
  }

  @Post('login')
  @ApiOperation({
    summary: 'User signup first step API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(User)
  })
  async login(
    @Body() dto: LoginInput
  ): Promise<BaseApiResponse<any>> {
    const user = await this.authService.getUser(
      dto.email,
      dto.password
    )
    const authToken = await this.authService.login(user)
    return { data: { ...authToken, user }, meta: {} }
  }

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    if (req.user) {
      return req.user
    }
    return 'error'
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Refresh access token API'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(AuthTokenOutput)
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: BaseApiErrorResponse
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async refreshToken(
   @UserScope() user,
  ): Promise<BaseApiResponse<AuthTokenOutput>> {
    const authToken = await this.authService.refreshToken(
      user
    )
    return { data: authToken, meta: {} }
  }

  @Post('create-password-step')
  @ApiOperation({
    summary: 'Create password in final step signup.'
  })
  async createPassword(
    @Body() dto: CreatePasswordDto
  ): Promise<BaseApiResponse<User>> {
    const user = await this.authService.createPassword(dto)
    return {
      data: user,
      meta: {}
    }
  }
}
