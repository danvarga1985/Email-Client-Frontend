import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Email } from '../model/email';
import { EmailDetails } from '../model/email-details';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  emails: Email[] = [];

  constructor(private http: HttpClient) { }

  getEmails(): Observable<Email[]> {
    return this.http.get<Email[]>(`${environment.API_URL}/emails`)
      .pipe(
        tap(response => {
          response.forEach(email => {
            this.emails.push(email);
          });
        })
      )
  }

  getEmailById(id: string): Observable<EmailDetails> {
    return this.http.get<EmailDetails>(`${environment.API_URL}/emails/${id}`);
  }
}
