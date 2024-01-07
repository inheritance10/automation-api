import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.usersService.findOne(email);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if(!bcrypt.compareSync(password, user.password)){
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { passwordHash, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(body: any) {
    return await this.usersService.create(body?.user, body?.company);
  }
}
