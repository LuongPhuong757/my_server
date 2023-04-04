import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth2'
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: "348326641771-1vckjuvv44rik95jgmu5f210adjq1n41.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ['email', 'profile']
    });
  }

  async validate(profile: any, done: VerifyCallback) {
    done(null, profile)
  }
}
