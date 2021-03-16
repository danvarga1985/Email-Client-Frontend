import { Component, Input, OnInit } from '@angular/core';
import { OutgoingEmail } from 'src/app/model/outgoing-email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnInit {
  showModal = false;
  @Input() email: OutgoingEmail;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------ ${this.email.from} wrote:\n>${this.email.text.replace(/\n/gi, '\n> ')}`
    }

  }

  onSubmit(email: OutgoingEmail) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }
}
