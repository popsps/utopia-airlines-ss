import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Booking} from '../../shared/models/booking';
import {BookingService} from '../../shared/services/booking.service';
import {environment} from '../../../environments/environment';
import {FormGroup, FormBuilder, Validators, AbstractControl, FormArray} from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  booking: Booking;
  bForm: FormGroup;
  bookingId: number;
  readonly = true;
  loading = false;
  deleted = false;
  error = {isError: false, message: '', status: null};

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
        booking?.flights.forEach(flight => {
          flight.departureTime = new Date(flight.departureTime);
          flight.arrivalTime = new Date(flight.departureTime);
          flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
        });
        this.booking = booking;
        this.initForm();
        this.loading = false;
      }, error => {
        this.loading = false;
        // this.error = {isError: true, message: error?.error?.message || error?.message, status: error?.status};
        this.error = {isError: true, message: 'NO such a booking exists', status: 404};
        console.log('error', error);
      });

  }

  submitUpdate(): void {
    console.log(JSON.stringify(this.booking));
    // this.booking.bookerId = this.booking.id;
    this.bookingService.updateBookingById(environment.bookingApiUrl, this.bookingId, this.booking)
      .subscribe(booking => {
        console.log(booking);
        this.booking = booking;
      }, error => console.log('error:', error));
    this.toggleEditForm();
  }

  deleteBooking(): void {
    // this.booking.bookerId = this.booking.id;
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

  initForm(): void {
    // const {id, isActive, bookerId, confirmationCode, passengers} = this.booking;
    const {id, isActive, passengers, flights} = this.booking;
    this.bForm = this.fb.group({
      id,
      isActive,
      // confirmationCode,
      // bookerId,
      passengers: this.fb.array([]),
      flights: this.fb.array([])
    });
    passengers.forEach(passenger => {
      const passengerForm = this.fb.group({
        id: passenger?.id,
        // bookingId: passenger?.bookingId,
        name: this.fb.group({
          given: passenger?.name.given,
          family: passenger?.name.family,
        }),
        dob: passenger?.dob,
        gender: passenger?.gender,
        address: passenger?.address
      });
      this.getPassengersForms().push(passengerForm);
    });
    console.log('form:', this.bForm.value);
    this.bForm.valueChanges.subscribe(value => {
      this.booking = {...this.bForm.value};
      // this.booking = new Booking(this.bForm.value);
      console.log(this.booking);
    });
  }

  getPassengersForms(): FormArray {
    return this.bForm.get('passengers') as FormArray;
  }

  getFlightsForms(): FormArray {
    return this.bForm.get('flights') as FormArray;
  }

  addPassengerForm(): void {
    const passenger = this.fb.group({
      bookingId: this.booking.id,
      name: this.fb.group({
        given: '',
        family: '',
      }),
      dob: '',
      gender: '',
      address: ''
    });
    this.getPassengersForms().push(passenger);
  }

  addFlightForm(): void {
    const flight = this.fb.group({});
    this.getFlightsForms().push(flight);
  }

  deletePassengerForm(i: number): void {
    this.getPassengersForms().removeAt(i);
  }

  deleteFlightForm(i: number): void {
    this.getFlightsForms().removeAt(i);
  }

  toggleEdit(i: number): void {
    this.booking.passengers[i].editable = !this.booking.passengers[i].editable;
  }

  updatePassenger(i: number): void {
    this.booking.passengers[i].editable = !this.booking.passengers[i].editable;
  }

  deletePassenger(i: number): void {
    this.booking.passengers[i].editable = !this.booking.passengers[i].editable;
  }
}
