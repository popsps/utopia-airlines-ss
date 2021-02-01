import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import { AuthService } from '../shared/services/auth.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userId: string;
  user: any;
  apiUrl: string;
  edit: boolean;
  updateUserForm: FormGroup;
  username: string;
  password: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  updatedUser: any;

  constructor(
    private authService: AuthService,
    private userService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiUrl = `${environment.userApiUrl}`;
    this.edit = false;
    this.initializeUser();
    this.initializeForms();
  }

  initializeUser() {
    this.userId = this.router.url.substring(7);
    this.apiUrl = environment.userApiUrl + "/" + this.userId;
    this.userService.get(this.apiUrl).subscribe((res) => {
      this.user = res;
    });
  }

  initializeForms() {
    this.updateUserForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      givenName: new FormControl(this.givenName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      familyName: new FormControl(this.familyName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(this.email, [Validators.required]),
      phone: new FormControl(this.password, [Validators.required]),
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  updateUser() {
    this.toggleEdit();
    console.log(this.updateUserForm.value);
    this.userService.update(this.apiUrl, this.updateUserForm.value).subscribe((res) => {
      this.initializeForms();
      this.initializeUser();
    });
  }

  deleteUser() {
    this.userService.delete(this.apiUrl).subscribe((res) => {
      this.router.navigate
    });
    // alert("Deleted");
  }
}
