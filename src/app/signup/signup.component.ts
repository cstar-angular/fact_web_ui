import { Component,OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { Observable } from 'rxjs/Observable';
declare var jquery:any;
declare var $ :any;
import { FlashMessagesService } from 'angular2-flash-messages';
import {
    AuthService as Social,
    FacebookLoginProvider,
    GoogleLoginProvider,
    LinkedinLoginProvider
} from 'angular5-social-auth';

import { setting } from "../core/setting";

@Component({
 selector: 'app-signup',
 templateUrl: './signup.component.html',
 styleUrls: ['./signup.component.css']
})

@Injectable({
   providedIn:'root'
})

export class SignupComponent implements OnInit {
     constructor(
         private httpClient: HttpClient,
         private router: Router,
         private authService: AuthService,
         private token: TokenStorage,
         private _flashMessagesService: FlashMessagesService,
         private socialAuthService: Social
     ) {

     }

     public element = document.getElementById("popup-background") as any;

     ngOnInit() {
     }

     username: string;
     l_username:string;
     l_password : string;
     client_secret: string;
     grant_type: string;
     client_id: string;

     first_name : string;
     last_name : string;
     email : string;
     gender : string = 'MALE';
     password : string;
     dob : string;
     phone : number;
     confirm_password : string;
     terms : number = 0;

     public authorized: boolean = false;
     login(){
         this.client_secret = setting.setting_client_secret;
         this.grant_type = setting.setting_grant_type;
         this.client_id = setting.setting_client_id;
         if(!(this.l_username) || !(this.l_password) || !(this.l_username.trim()) || !(this.l_password.trim()) ){
             if(!(this.l_username) || !(this.l_username.trim())){
                 document.getElementById('username-error').innerHTML = 'Invalid Username';
             }
             if(!(this.l_password) || !(this.l_password.trim())){
                 document.getElementById('password-error').innerHTML = 'Invalid Password';
             }
             return false;
         }
         this.authService.attemptAuth(this.l_username, this.l_password, this.client_secret, this.grant_type, this.client_id).subscribe(data => {
             if(data.access_token){
                 this.token.saveToken(data.access_token);
                 this.router.navigate(['/profile']);
             }
          });
      }
      //registration
      register(){
          if($('.error').length > 0){
              $('.error').remove();
          }
          if(!(this.first_name) || !(this.last_name) || !(this.email) || isNaN(this.phone) || !(this.gender) || !(this.username) || !(this.password) || !(this.dob) || !(this.phone) || !(this.confirm_password) || this.terms <= 0){
              if(!(this.first_name)){
                  $('#first_name').addClass('input_error');
                  $('#first_name_error').append('<span class="error" data-toggle="tooltip" title="Invalid firstname"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.last_name)){
                   $('#last_name').addClass('input_error');
                   $('#last_name_error').append('<span class="error" data-toggle="tooltip" title="Invalid lastname"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.email)){
                  $('#email').addClass('input_error');
                  $('#email-error').append('<span class="error" data-toggle="tooltip" title="Invalid email"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.gender)){
                  $('#gender-error').append('<span class="error" data-toggle="tooltip" title="Invalid gender"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.username)){
                  $('#username').addClass('input_error');
                  $('#username-error').append('<span class="error" data-toggle="tooltip" title="Invalid username"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.dob)){
                  $('#dob').addClass('input_error');
                  $('#dob_error').append('<span class="error" data-toggle="tooltip" title="Invalid Date of birth"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.phone) || isNaN(this.phone)){
                  $('.telephone-no').addClass('telephone_input_error');
                  $('#phone_error').append('<span class="error" data-toggle="tooltip" title="Invalid phone"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.password)){
                  $('#password').addClass('input_error');
                  $('#password-error').append('<span class="error" data-toggle="tooltip" title="Invalid password"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(!(this.confirm_password)){
                  $('#confirm_password').addClass('input_error');
                  $('#confirm-password-error').append('<span class="error" data-toggle="tooltip" title="Invalid password"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(this.password != '' && this.confirm_password != '' && this.password != this.confirm_password){
                  $('#confirm_password').addClass('input_error');
                  $('#confirm-password-error').append('<span class="error" data-toggle="tooltip" title="Password dosent match"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              if(this.terms <= 0){
                  $('#terms').addClass('input_error');
                  $('#terms-conditions-error').append('<span class="error" data-toggle="tooltip" title="Please Agree to terms & conditions"> <i class="fa fa-info-circle" aria-hidden="true"></i> </span>');
              }
              return false;
          }
          this.authService.attemptRegister(this.first_name, this.last_name, this.email, this.gender,this.username,this.dob,this.phone,this.password).subscribe(data => {
              if(data.status == 1){
                  this.first_name = '';
                  this.last_name = '';
                  this.email = '';
                  this.gender = '';
                  this.username = '';
                  this.dob = '';
                  this.password = '';
                  this.confirm_password = '';
                  this._flashMessagesService.show('Profile Created Successfully , Please Login !', { cssClass: 'alert-success', timeout: 5000 });
                  location.reload();
              }else{
                  this._flashMessagesService.show('Sorry!! Something went wrong , Please try again !', { cssClass: 'alert-danger', timeout: 5000 });
                  this.router.navigate(['/']);
              }
          });
      }
      updateGender(selected_gender : string){
          if(selected_gender){
              this.gender = selected_gender;
          }
      }
      updateTerms(){
          if($('#terms').is(':checked')){
              this.terms = 1;
          }else{
              this.terms = 0;
          }
      }
      socialLogin(type : string){
          if(type){
              this.socialAuthService.signIn(type).then(
                  (userData) => {
                      var fb_id = userData['id'];
                      var accessToken = userData['token'];
                      var res = userData['name'].split(" ");
                      var first_name = res[0];
                      var last_name = res[1];
                      var email = userData['email'];
                      var image = userData['image'];
                      if(type == 'facebook'){
                           this.authService.facebook_api(fb_id,accessToken,first_name,last_name,email,image).subscribe(data => {
                               if(data){
                                   this.token.saveToken(data.access_token);
                                   this.router.navigate(['/profile']);
                               }
                           });
                      }else if(type == 'google'){
                          this.authService.google_api(fb_id,accessToken,first_name,last_name,email,image).subscribe(data => {
                              if(data){
                                  this.token.saveToken(data.access_token);
                                  this.router.navigate(['/profile']);
                              }
                          });
                      }
                  }
              );
          }
      }

      updateBxclose(){
        $('.sign-up-modal').removeClass('login-form-active');
      }
}
