import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { Router } from '@angular/router';
declare var jquery:any;
declare var $ :any;

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private token: TokenStorage,private authService: AuthService,private router: Router) { }

  ngOnInit() {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.clear();
  }

}
