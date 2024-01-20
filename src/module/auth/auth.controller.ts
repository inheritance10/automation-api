import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("login")
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      // Kullanıcı yoksa hata döndür
      return { error: "Kullanıcı bulunamadı veya şifre yanlış" };
    }
    return this.authService.login(user);
  }

  @Post("register")
  async register(@Body() body: any) {
    return await this.authService.register(body);
  }

  @Get("test")
  async getProfile(@Body() body: any) {
    return 'body';
  }
}
