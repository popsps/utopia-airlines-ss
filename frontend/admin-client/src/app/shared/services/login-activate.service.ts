import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {authService} = this;
    authService.loading = true;
    authService.getSessionInfo(environment.sessionInfoUrl).subscribe(
      user => {
        authService.isLoggedIn = true;
        authService.user = user;
        console.log('url', state.url);
        if (state.url === '/home') {
          this.router.navigate(['']).then(r => authService.loading = false);
        } else if (state.url === '/signup') {
          this.router.navigate(['']).then(r => authService.loading = false);
        }
      },
      error => {
        authService.isLoggedIn = false;
        authService.user = null;
        authService.loading = false;
        if (state.url !== '/signup') {
          this.router.navigate(['home']).then(r => authService.loading = false);
        }
      }, () => {
        if (!authService.isLoggedIn) {
          console.log(authService.isLoggedIn);
          this.router.navigate(['home']).then(r => authService.loading = false);
        }
        console.log('never get here');
        authService.loading = false;
      });
    return true;
  }
}
