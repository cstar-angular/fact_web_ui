import { Injectable } from '@angular/core';
import {
 HttpRequest,
 HttpHandler,
 HttpEvent,
 HttpInterceptor,
 HttpErrorResponse,
 HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { RouterModule,Routes,Router,ActivatedRoute,CanActivate, Params } from '@angular/router';
import { TokenStorage } from '../core/token.storage';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
   accessToken: string;
 constructor(private token: TokenStorage, private router: Router) {}

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.accessToken = this.token.getToken() !== undefined ? this.token.getToken() : '';
     request = request.clone({
     setHeaders: {
         Authorization: `Bearer ${this.accessToken}`
     }
   });
   return next
     .handle(request).do((ev: HttpEvent<any>) => {
       if (ev instanceof HttpResponse) {
         if (ev.status === 401) {
              window.sessionStorage.removeItem(TOKEN_KEY);
              window.sessionStorage.clear();
              this.router.navigate(['']);
         }
       }
     });

 }
}
