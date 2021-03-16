import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailDetails } from '../model/email-details';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<EmailDetails> {

  constructor(private emailService: EmailService, private router: Router) { };

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EmailDetails | Observable<EmailDetails> | Promise<EmailDetails> {
    const { id } = route.params;

    return this.emailService.getEmailById(id)
      .pipe(
        catchError(() => {
          this.router.navigateByUrl('/inbox/not-found');

          // return empty Observable
          return EMPTY;
        })
      );
  };

}
