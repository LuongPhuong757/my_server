import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserToken } from 'entities/user-token.entity'
import { UserTokenService } from './user-token.service'

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserToken
        ])
    ],
    providers: [UserTokenService],
    controllers: [],
    exports: [UserTokenService]
})
export class UserTokenModule { }
