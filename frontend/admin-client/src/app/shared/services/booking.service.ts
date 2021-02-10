import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Booking} from '../models/booking';
import {Passenger} from '../models/passenger';

type BookingJson = {
  rows: Booking[];
  count: number;
};

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private hasError = false;

  constructor(private http: HttpClient) {
  }

  totalBookings: number;

  getAllBookings(url: string): Observable<Booking []> {
    return this.http.get<BookingJson>(url).pipe(
      map(rdata => {
        this.totalBookings = rdata.count;
        return rdata.rows.map(data => new Booking().deserialize(data));
      }), catchError(err => {
        console.log('pipe error');
        this.hasError = true;
        return throwError(err);
      }));
  }

  getBookingById(url: string, id: number): Observable<Booking> {
    return this.http.get<Booking>(`${url}/${id}`);
  }

  deleteBookingById(url: string, id: number): Observable<Booking> {
    return this.http.delete<Booking>(`${url}/${id}`);
  }

  updateBookingById(url: string, id: number, payload: Booking): Observable<Booking> {

    return this.http.put<Booking>(`${url}/${id}`, payload);
  }

  postABooking(url: string, payload: Booking): Observable<Booking> {
    return this.http.post<Booking>(url, payload);
  }

  updatePassengerById(url: string, id: number, payload: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${url}/${id}`, payload);
  }
}
