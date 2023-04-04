import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) { }

  public send(code: number): void {
    this.mailerService
      .sendMail({
        to: 'luongphuong757@gmail.com',
        from:'phuong.luong@sotatek.com',
        subject: "Xanalia: Verify",
        text: 'Verify Account',
        html: `
        <p>Your OTP code is: ${code}</p>
        `
      })
      .then(() => { console.log("Send Email Success!") })
      .catch((e) => {
        console.log('error send mail to report nft', e)
      });
  }
}
