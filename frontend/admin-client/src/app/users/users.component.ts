import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  totalUsers: number;
  searchString: string;
  searchUsersForm: FormGroup;
  addUserForm: FormGroup;
  username: string;
  password: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  role: string;
  apiUrl: string;
  isError: boolean;
  error: any;

  constructor(
    private userService: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.initializeUsers();
    this.initializeForm();
  }

  initializeUsers() {
    this.userService
      .get(this.apiUrl)
      .subscribe((res) => {
        this.isError = false;
        this.users = res;
        this.totalUsers = this.users.length;
      }, (err) => {
        this.isError = true;
        this.error = err.error;
      });
  }

  initializeForm() {
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      givenName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  addUser() {
    this.userService.post(this.apiUrl, this.addUserForm.value).subscribe((res) => {
      this.isError = false;
      this.initializeUsers();
      this.initializeForm();
    }, (err) => {
      this.isError = true;
      this.error = err.error;
    });
  }
}
