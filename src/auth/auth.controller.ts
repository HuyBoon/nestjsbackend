import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) { }

  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("Fetch login")
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }


  @Post('register')
  @Public()
  getProfile(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto)
  }

  @Post('check-code')
  @Public()
  checkCode(@Body() registerDto: CodeAuthDto) {
    return this.authService.checkCode(registerDto)
  }

  @Post('retry-active')
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email)
  }


  @Get('mail')
  @Public()
  testMail() {
    this.mailerService
      .sendMail({
        to: 'hbooncode74@gmail.com', // list of receivers
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        template: "register",
        context: {
          name: "HuyBoon",
          activationCode: 123456
        }
      })
    return "OK"
  }
}
