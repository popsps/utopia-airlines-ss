import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { environment } from "../../environments/environment"
import { HttpService } from "../shared/services/http.service";

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
  userFullName: string;
  userRole: string;
  userEmail: string;
  userPhoneNumber: string;
  constructor(
    private userService: HttpService
  ) { }

  ngOnInit(): void {
    this.initializeUsers();
  }

  initializeUsers() {
    this.userService
      .getAll(`${environment.utopiaAirlineApi}${environment.userApiUrl}`)
      .subscribe((res) => {
        this.users = res;
        this.totalUsers = this.users.length
      });
  }


}
