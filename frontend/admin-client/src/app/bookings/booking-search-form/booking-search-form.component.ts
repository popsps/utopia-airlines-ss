import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import {FormBuilder, FormGroup} from '@angular/forms';

type BookingFilter = {
  origin?: string;
  destination?: string;
  isActive?: string;
  limit?: number;
  fName?: string;
  lName?: string;
  type?: string;
};

@Component({
  selector: 'app-booking-search-form',
  templateUrl: './booking-search-form.component.html',
  styleUrls: ['./booking-search-form.component.scss']
})
export class BookingSearchFormComponent implements OnInit {

  @Input() bookingFilter: BookingFilter;
  @Output() filterChanged = new EventEmitter<BookingFilter>(true);
  filterBookingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.filterBookingForm = this.formBuilder.group({
      origin: [this.bookingFilter?.origin],
      destination: [this.bookingFilter?.destination],
      isActive: [this.bookingFilter?.isActive],
      limit: [this.bookingFilter?.limit],
      type: [this.bookingFilter?.type]
    });
    this.filterBookingForm.valueChanges.subscribe(value => {
      this.buildFilter(value);
      // this.filterChanged.emit(this.buildFilter(value));
    });
  }

  search(): void {
    this.filterChanged.emit(this.bookingFilter);
  }

  buildFilter(value: any): BookingFilter {
    const {origin, destination, isActive, limit, type} = value;
    this.bookingFilter = {
      fName: origin,
      lName: destination,
      isActive,
      limit,
      type
    };
    return {
      fName: origin,
      lName: destination,
      isActive,
      limit,
      type
      // departureDate: departureDateRange.start ? new Date(departureDateRange.start) : null
    };
  }
}
