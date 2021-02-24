import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagerService } from '../shared/services/pager.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  page = 1;
  limit = 15;
  totalUsers: number;
  pager: any = {};
  result: any;
  users: any;
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
  isSearching: boolean;
  searchUrl = "";

  constructor(
    private userService: HttpService,
    private formBuilder: FormBuilder,
    private pagerService: PagerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.isSearching = false;
    this.initializeUsers();
    this.initializeForm();
  }

  setPage(page: number): void {
    if (!this.totalUsers || page < 1 || page > this.pager.totalUsers) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalUsers, page, this.limit);
    console.log('pager server:', this.pager);
    console.log('paged users', this.users);
  }

  navigate(page: number): void {
    // if (page < 1 || page > this.totalUsers / this.limit) {
    //   this.isError = true;
    //   this.error = {
    //     message: "invalid page"
    //   };
    //   return;
    // }
    this.page = page;
    this.initializeUsers();
  }

  initializeUsers() {
    const offset = this.page - 1;
    console.log(this.apiUrl + "?offset=" + offset.toString() + "&limit=" + this.limit.toString() + this.searchUrl);
    this.userService
      .get(this.apiUrl + "?offset=" + offset.toString() + "&limit=" + this.limit.toString() + this.searchUrl)
      .subscribe((res) => {
        this.isError = false;
        this.result = res;
        this.users = this.result.content;
        this.totalUsers = this.result.totalElements;
        this.setPage(this.page);
        debugger;
        if (this.searchUrl) {
          this.isSearching = true;
        }
      }, (err) => {
        this.isError = true;
        this.error = err.error;
        console.log("Error happened");
      });
  }

  searchUsers(usernameFilter, emailFilter, roleFilter) {
    this.page = 1;
    const offset = this.page - 1;
    this.searchUrl = "";
    if (usernameFilter) {
      this.searchUrl = this.searchUrl.concat("&username=" + usernameFilter);
    }
    if (emailFilter) {
      this.searchUrl = this.searchUrl.concat("&email=" + emailFilter);
    }
    if (roleFilter) {
      this.searchUrl = this.searchUrl.concat("&role=" + roleFilter);
    }
    // this.userService
    //   .get(this.apiUrl + "?offset=" + offset.toString() + "&limit=" + this.limit.toString() + this.searchUrl)
    //   .subscribe((res) => {
    //     this.result = res;
    //     this.totalUsers = this.result.totalElements;
    //     this.users = this.result.content;
    //     this.setPage(this.page);
    //     this.isError = false;
    //     this.isSearching = true;
    //   }, (err) => {
    //     this.isError = true;
    //     this.error = err.error;
    //   });
    this.initializeUsers();
  }

  cancelSearch() {
    this.isSearching = false;
    this.page = 1;
    this.searchUrl = "";
    this.initializeUsers();
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
