import {Component, OnInit} from '@angular/core';
import {Booking} from '../shared/models/booking';
import {BookingService} from '../shared/services/booking.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = null;

  constructor(private bookingService: BookingService) {
  }

  getAllBookings(): void {
    this.bookingService.getAllBookings(environment.bookingApiUrl)
      .subscribe(bookings => {
        console.log(bookings);
        this.bookings = bookings;
      });
  }

  ngOnInit(): void {
    console.log('start');
    this.getAllBookings();
  }

}
