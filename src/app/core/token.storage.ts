import { Injectable } from '@angular/core';
//import { Server } from 'net';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}
