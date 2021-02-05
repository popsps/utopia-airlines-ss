import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../shared/services/booking.service';
import {Booking} from '../../shared/models/booking';
import {PagerService} from '../../shared/services/pager.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = null;
  totalBookings: number;
  pagedBookings: Booking[] = null;
  pager: any = {};
  loading = false;
  error = {isError: false, message: '', status: null};

  constructor(private bookingService: BookingService, private  pagerService: PagerService) {
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
        this.totalBookings = bookings.length;
        this.setPage(1);
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

  setPage(page: number): void {
    console.log('set page', page);
    if (page < 1 || page > this.pager.totalBookings) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalBookings, page, 10);
    this.pagedBookings = this.bookings.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
