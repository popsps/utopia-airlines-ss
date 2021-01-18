import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../shared/models/booking';
import {BookingService} from '../../shared/services/booking.service';
import {environment} from '../../../environments/environment';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  booking: Booking;
  bookingId: number;
  readonly = true;
  loading = false;
  deleted = false;
  error = {isError: false, message: ''};

  constructor(private  route: ActivatedRoute, private bookingService: BookingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => this.bookingId = param.id);
    console.log(this.bookingId);
    this.loading = true;
    this.bookingService.getBookingById(environment.bookingApiUrl, this.bookingId)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = {isError: true, message: error.message};
        console.log('error', error);
      });
  }

  submitUpdate(): void {
    console.log(JSON.stringify(this.booking));
    this.booking.bookerId = this.booking.id;
    this.bookingService.updateBookingById(environment.bookingApiUrl, this.bookingId, this.booking)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
      }, error => console.log('error:', error));
    this.toggleEditForm();
  }

  deleteBooking(): void {
    this.booking.bookerId = this.booking.id;
    this.bookingService.deleteBookingById(environment.bookingApiUrl, this.bookingId)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
        this.deleted = true;
      }, error => console.log('error:', error));
  }

  toggleEditForm(): void {
    this.readonly = !this.readonly;
  }

}
