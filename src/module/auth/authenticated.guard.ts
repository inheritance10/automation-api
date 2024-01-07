import { CanActivate } from "@nestjs/common";

export class AuthenticatedGuard implements CanActivate {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
}
