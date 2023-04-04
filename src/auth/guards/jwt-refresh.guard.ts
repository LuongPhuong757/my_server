import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserTokenService } from 'src/user-token/user-token.service'
import { AuthService } from '../auth.service'
import { STRATEGY_JWT_REFRESH } from '../constants/strategy.constants'

@Injectable()
export class JwtRefreshGuard extends AuthGuard(STRATEGY_JWT_REFRESH) {
  constructor(
    private authService: AuthService,
      private userTokenService: UserTokenService
  ) {
    super()
  }
  async canActivate(context: ExecutionContext): Promise<any> {
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException(`${info}`)
    }
    return user
  }
}
