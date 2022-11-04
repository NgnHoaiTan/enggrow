import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { Injectable } from '@nestjs/common';


@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const activate = (await super.canActivate(context)) as boolean
        const req = context.switchToHttp().getRequest();
        await super.logIn(req)
        return activate
    }
}