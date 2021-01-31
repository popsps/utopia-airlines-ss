import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../shared/services/booking.service';
import {Booking} from '../../shared/models/booking';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = null;
  loading = false;
  error = {isError: false, message: '', status: null};

  constructor(private bookingService: BookingService) {
  }

  getAllBookings(): void {
    this.loading = true;
    this.bookingService.getAllBookings(environment.bookingApiUrl)
      .subscribe(bookings => {
        console.log('all bookings:', bookings);
        bookings.forEach(booking => {
          booking?.flights.forEach(flight => {
            flight.departureTime = new Date(flight.departureTime);
            flight.arrivalTime = new Date(flight.departureTime);
            flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
          });
        });
        this.bookings = bookings;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = {isError: true, message: error?.error?.message || error?.message, status: error?.status};
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.getAllBookings();
  }

}
