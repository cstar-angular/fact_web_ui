import { Component, OnInit,Input } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { Router, NavigationStart } from '@angular/router';
declare var jquery:any;
declare var $ :any;

const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  auth : number = 0 ;
  result :Array<any>=[];
  site_search : string;

  languages = [
    {label: 'MK', code: 'en'},
    {label: 'AL', code: 'al'},
  ];
  localeId: string = localStorage.getItem('language');

  constructor(
      private token: TokenStorage,
      private authService: AuthService,
      private router: Router,
    //   public translate: 
    ) { }
    ngOnInit() {
        if (this.token.getToken() != null){
            this.auth = 1;
            this.authService.attemptProfile().subscribe(data => {
                this.result = data;
            });
        }
    }
    //top search
    globalSearch(){
        var q = $('#site-search').val();
        if(q){
            this.router.navigate(['/search/'+q]);
        }
    }
    //logout
    getLogoutProfile(): void {
        this.auth = 0;
        this.router.navigate(['logout']);
    }


    updateBxopen(){
        $('.sign-up-modal').addClass('login-form-active');

    }

    changeLanguage(lang: string) {
        window.localStorage.setItem('language', lang);
        this.localeId = lang;
        location.reload();
    }
}
