import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailDetails } from 'src/app/model/email-details';
import { OutgoingEmail } from 'src/app/model/outgoing-email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: EmailDetails;

  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authService.username}@angular-email.com`,
    }
  }

  ngOnInit(): void {
  }

  onToggleModal() {
    this.showModal = !this.showModal;

  }

  onSubmit(email: OutgoingEmail) {

    let emailToSend = new OutgoingEmail();
    emailToSend.subject = email.subject;
    emailToSend.text = email.text;
    emailToSend.from = this.email.from;
    emailToSend.to = email.to;

    console.log(emailToSend);

    this.emailService.sendEmail(emailToSend).subscribe(() => {
      this.showModal = false;
    });
  }

}
