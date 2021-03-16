import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailDetails } from 'src/app/model/email-details';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: EmailDetails;

  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    // console.log(this.route.snapshot.data);

    // Instant access
    this.email = this.route.snapshot.data.email;
    this.route.data.subscribe(val => {
      this.email = val.email;
    })

  }

  ngOnInit(): void { }
}

