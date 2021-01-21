import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from "../../environments/environment"
import { HttpService } from "../shared/services/http.service";
import { User } from "../shared/models/user"

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
  user: User;
  apiUrl: string;

  constructor(
    private userService: HttpService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.apiUrl = `${environment.utopiaAirlineApi}${environment.userApiUrl}`;
    this.initializeUsers();
    this.initializeForm();
  }

  initializeUsers() {
    this.userService
      .getAll(this.apiUrl)
      .subscribe((res) => {
        this.users = res;
        this.totalUsers = this.users.length
      });
  }

  initializeForm() {
    this.addUserForm = new FormGroup({
      username: new FormControl(this.username, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      givenName: new FormControl(this.givenName, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      familyName: new FormControl(this.familyName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: new FormControl(this.email, [Validators.required]),
      phone: new FormControl(this.password, [Validators.required]),
      role: new FormControl(this.role, [Validators.required])
    })
  }

  addUser() {
    this.userService.post(this.apiUrl.concat("/signup"), this.addUserForm.value).subscribe((res) => {
      this.initializeUsers();
      this.initializeForm();
    });
  }
}
