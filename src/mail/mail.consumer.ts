import { Process, Processor } from '@nestjs/bull'
import { Job } from 'bull'
import * as nodemailer from 'nodemailer'

@Processor('send-mail')
export class MailConsumer {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAILDEV_INCOMING_USER,
        pass: process.env.MAILDEV_INCOMING_PASS,
      },
    })
  }

  @Process('sendMail')
  async sendMail(job: Job<{ mailOptions: any }>) {
    await this.transporter.sendMail(job.data.mailOptions)
    return true
  }
}
