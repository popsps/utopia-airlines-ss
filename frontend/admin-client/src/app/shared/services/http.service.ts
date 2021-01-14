import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getAll(url: string): Observable<object> {
    return this.http.get(url);
  }

  post(url: string, payload: object): Observable<object> {
    return this.http.post(url, payload);
  }
}
