import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/token.interceptor';
import { KeysPipe } from './core/keys-pipe.pipe';
import { SafePipe } from './core/safe-pipe.pipe';

import { registerLocaleData, Location } from '@angular/common';
import localeAl from '@angular/common/locales/sq';
import localeAlExtra from '@angular/common/locales/extra/sq';
import localeMas from '@angular/common/locales/mas';
import localeMasExtra from '@angular/common/locales/extra/mas';

registerLocaleData(localeAl, 'sq', localeAlExtra);
registerLocaleData(localeMas, 'mk', localeMasExtra);

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-auth';

//  custom component
import { AppComponent } from './app.component';  // Bootstrapped component


import { HomeComponent } from './home/home.component'; // homepage
import { ProfileComponent } from './profile/profile.component'; // profilepage
import { SearchComponent } from './search/search.component'; // profilepage

// supporting components of main pages
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';
import { BannerHomeComponent } from './banner-home/banner-home.component';
// import {FlashMessageModule} from 'angular-flash-message';
import { FlashMessagesModule } from 'angular2-flash-messages';


import { AuthService } from './core/auth.service';

import { AnalyticService } from './core/analytics.service';

import { TokenStorage } from './core/token.storage';


//  node_modules
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';



//  services
import { TodoDataService } from './todo/todo-data.service';


//  Import routing module
import { AppRoutingModule } from './app.routing';
import { SignupComponent } from './signup/signup.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { IframeComponent } from './iframe/iframe.component';
import { OtherNewsComponent } from './other-news/other-news.component';
import { LogoutComponent } from './logout/logout.component';
import { SensitivitySettingComponent } from './sensitivity-setting/sensitivity-setting.component';
import { NewsStorage } from './storage/news.storage';
import { SortingServilce } from './core/sorting.service';
import { MomentModule } from 'angular2-moment';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { HomeMainsectionComponent } from './home-mainsection/home-mainsection.component';
import { ErrorDialogComponent } from './core/error-dialog.component';


export function getAuthServiceConfigs()
{
  const CONFIG = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('2193521684265912')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('212425767980-gss71a34npsjgdliabqi5chkqrj2uvae.apps.googleusercontent.com')
      },
      //  {
      //    id: GoogleLoginProvider.PROVIDER_ID,
      //    provider: new GoogleLoginProvid('Your-Google-Client-Id')
      //  },
      //   {
      //    id: LinkedinLoginProvider.PROVIDER_ID,
      //    provider: new GoogleLoginProvid('Your-Linkedin-Client-Id')
      //  },
    ]
  );
  return CONFIG;
}

export function getLocale() {
  return window.localStorage.getItem('language');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    RightSidenavComponent,
    BannerHomeComponent,
    SignupComponent,
    KeysPipe,
    SafePipe,
    IframeComponent,
    OtherNewsComponent,
    LogoutComponent,
    SensitivitySettingComponent,
    LeftSidenavComponent,
    HomeMainsectionComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCarouselModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // FlashMessageModule,
    FlashMessagesModule.forRoot(),
    InfiniteScrollModule,
    SocialLoginModule,
    MomentModule,
  ],
  providers: [
    TodoDataService,
    AuthService,
    TokenStorage,
    NewsStorage,
    SortingServilce,
    AnalyticService,
    TokenInterceptor, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    { 
      provide: LOCALE_ID, 
      useValue: 'en'
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
