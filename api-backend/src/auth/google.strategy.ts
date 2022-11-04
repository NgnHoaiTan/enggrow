import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-google-oauth20'
import { Injectable } from '@nestjs/common';
import { AuthService } from "./auth.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) { 
        super({
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:process.env.CALLBACK_URL,
            scope:['profile','email']
        }); 
    }
    // async validate(accessToken: string, refreshToken: string, profile: any) {
    //     // console.log(accessToken)
    //     // console.log(refreshToken)
    //     console.log(profile)
    //     const user = await this.authService.validateGoogleUser({
    //         id:profile.id,
    //         email:profile.emails[0].value,
    //         email_verified:profile.emails[0].verified,
    //         displayName: profile.displayName,
    //         picture: profile.photos[0].value
    //     })
        
    //     return {user:user,accessToken: accessToken} || null;
    // }
}