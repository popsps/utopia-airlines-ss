import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../shared/services/auth.service';

type Token = {
  access_token: string;
};
type User = {
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
};

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  token: Token = null;
  user: User = {username: '', password: '', firstname: ''};

  constructor(private http: HttpClient, public authService: AuthService) {
  }

  login(): void {
    console.log('user:', this.user);
    this.http.post(environment.loginUrl,
      JSON.stringify(this.user), {
        headers: new HttpHeaders({'Content-type': 'application/json ; charset=UTF-8'}),
        withCredentials: true,
        observe: 'response'
      })
      .subscribe(res => {
        console.log(res);
      }, error => console.log('error:', error));
  }

  ngOnInit(): void {
  }

}
