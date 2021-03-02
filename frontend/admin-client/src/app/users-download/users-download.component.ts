import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from '../shared/services/http.service';
import {FileSaverService } from 'ngx-filesaver';
import { Users } from '../shared/types';

@Component({
  selector: 'app-users-download',
  templateUrl: './users-download.component.html',
  styleUrls: ['./users-download.component.scss']
})
export class UsersDownloadComponent implements OnInit {
  apiUrl: string;
  users: Users;
  isError: boolean;
  error: any;

  constructor(
    private userService: HttpService,
    private fileSaverService: FileSaverService
  ) { }

  ngOnInit(): void {
    this.apiUrl = environment.userApiUrl;
    this.isError = false;
    this.initializeUsers();
  }

  initializeUsers() {
    const fileName = `Utopia_users.csv`;
    this.userService
      .get(this.apiUrl)
      .subscribe((res: Blob) => {
        this.isError = false;
        this.fileSaverService.save(res, fileName);
      }, (err) => {
        this.isError = true;
        this.error = err.error;
      });
      return
  }


  onDown(type: string) {
    const fileName = `Utopia_users.csv`;
    this.userService.get(this.apiUrl)
      .subscribe(res: Blob => {
        this.fileSaverService.save(res.body, fileName);
      });
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  }

}
