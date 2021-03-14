import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userSignedIn: boolean;
  private authStatusSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSubscription = this.authService.getSignedin()
      .subscribe(signedin => this.userSignedIn = signedin);

    this.authService.checkAuthStatus().subscribe();
  }

  ngOnDestroy(): void {
    this.authStatusSubscription.unsubscribe();
  }

}


