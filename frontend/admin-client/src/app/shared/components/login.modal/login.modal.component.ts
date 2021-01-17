import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

type Token = {
  access_token: string;
};
type User = {
  username: string;
  password: string;
};

@Component({
  selector: 'app-login-modal',
  templateUrl: './login.modal.component.html',
  styleUrls: ['./login.modal.component.scss']
})

export class LoginModalComponent implements OnInit {
  token: Token = null;
  user: User = {username: '', password: ''};

  constructor(private http: HttpClient) {
  }

  login(): void {
    console.log('user:', this.user);
    this.http.post<Token>('http://localhost:8081/users/signin',
      JSON.stringify(this.user), {
        headers: new HttpHeaders({'Content-type': 'application/json ; charset=UTF-8'})
      })
      .subscribe(jwtToken => {
        console.log(jwtToken);
        this.token = jwtToken;
        console.log('access_token:', this.token.access_token);
      }, error => console.log('error:', error));
  }

  ngOnInit(): void {
  }

}
