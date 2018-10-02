import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage'
import 'rxjs/add/operator/do';
import { AuthService } from '../core/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KeysPipe } from '../core/keys-pipe.pipe';

@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.css']
})
export class RightSidenavComponent implements OnInit {
    twitter_feed : Array<any>;
    result: Array<any>;
  constructor(private http: HttpClient,private router: Router, private token: TokenStorage,private authService: AuthService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
      this.authService.twitter().subscribe(
        data => {
            this.twitter_feed = data;
        });
      this.authService.topNews().subscribe(
        data => {
          this.result = data;
          console.log(data);
        });
  }
}
