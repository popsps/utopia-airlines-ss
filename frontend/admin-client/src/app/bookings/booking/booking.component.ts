import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../shared/models/booking';
import {BookingService} from '../../shared/services/booking.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  booking: Booking;
  bookingId: number;

  constructor(private  route: ActivatedRoute, private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => this.bookingId = param.id);
    console.log(this.bookingId);
    this.bookingService.getBookingById(environment.bookingApiUrl, this.bookingId)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
      });
  }

}
