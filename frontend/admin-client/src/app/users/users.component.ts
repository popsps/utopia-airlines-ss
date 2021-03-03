import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // TODO: Add Typescript type instead of any
  users: any;
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
  // TODO: Create Error Entity
  error: any;

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.initializeUsers();
    this.initializeForm();
  }

  initializeUsers() {
    this.httpService
      .get(this.apiUrl)
      .subscribe((res) => {
        this.isError = false;
        this.users = res;
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
    this.httpService.post(this.apiUrl, this.addUserForm.value).subscribe((res) => {
      this.isError = false;
      this.initializeUsers();
      this.initializeForm();
    }, (err) => {
      this.isError = true;
      this.error = err.error;
    });
  }

  onSaveCSVFile(): void {
    this.userService.saveUsersAsCSV(this.users);
  }
}
