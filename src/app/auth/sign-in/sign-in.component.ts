import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9]+$/),
      ],
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ],
    ),
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    this.authService.signInUser(this.authForm.value).subscribe({
      next: res => {
        this.router.navigate(['/inbox']);
      },
      error: ({ error }) => {
        if (error.username || error.password) {
          this.authForm.setErrors({
            credentials: true,
          })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }

      }
    });


  }

}
