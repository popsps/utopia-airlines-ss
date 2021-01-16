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
    this.getAllBookings();
  }

}
