import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: false;
  message: number;

  constructor() {
    this.message = 2;
  }
}
