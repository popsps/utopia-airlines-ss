import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Booking} from '../models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  getAllBookings(url: string): Observable<Booking []> {
    // return this.http.get<Booking[]>(url).pipe(map(data =>
    //   new Booking().deserialize(data)), catchError(() => throwError('Cannot')));
    return this.http.get<Booking[]>(url).pipe(
      map(rdata => rdata.map(data => new Booking().deserialize(data)))
    );
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
}
