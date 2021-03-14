import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]
      ),
      passwordConfirmation: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ]
      ),
    },
    // Validation for the whole FormGroup
    { validators: [this.matchPassword.validate] });

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const { username, password, passwordConfirmation } = this.authForm.value;

    this.authService.signUpUser(
      {
        username: username,
        password: password,
        passwordConfirmation: passwordConfirmation
      }
    )
      .subscribe({
        next: response => {
          // Navigate to some other route
          this.router.navigate(['/inbox']);

        },
        error: err => {
          if (!err.status) {
            this.authForm.setErrors({
              noConnection: true,
            })
          } else {
            this.authForm.setErrors({ unknownError: true })
          }
        }
      });
  }

}
