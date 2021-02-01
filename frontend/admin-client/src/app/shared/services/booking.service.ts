import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Booking} from '../models/booking';
import {Passenger} from '../models/passenger';

// type Passenger = {
//   name?: {
//     given?: string;
//     family?: string;
//   };
//   dob?: string;
//   gender?: string;
//   address?: string;
// };

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

  updatePassengerById(url: string, id: number, payload: Passenger): Observable<Passenger> {
    return this.http.put<Passenger>(`${url}/${id}`, payload);
  }
}
