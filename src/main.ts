import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { lang } from 'moment';

if (environment.production) {
  enableProdMode();
}

// use the require method provided by webpack
declare const require;
let language_code = window.localStorage.getItem('language');

if (language_code == null) {
  language_code = 'en';
}
// we use the webpack raw-loader to return the content as a string
const translations = require(`raw-loader!./locale/messages.` + language_code + `.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: TRANSLATIONS, useValue: translations},
    {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
  ]
}).catch(err => console.log(err));
