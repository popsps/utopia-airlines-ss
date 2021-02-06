import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../shared/services/booking.service';
import {Booking} from '../../shared/models/booking';
import {PagerService} from '../../shared/services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  page = 1;
  limit = 10;
  error = {isError: false, message: '', status: null};

  constructor(private bookingService: BookingService,
              private  pagerService: PagerService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  getBookings(page = 1): void {
    this.loading = true;
    this.bookingService.getAllBookings(`${environment.bookingApiUrl}?offset=${page - 1}&limit=${this.limit}`)
      .subscribe(bookings => {
        console.log('bookings:', bookings);
        bookings.forEach(booking => {
          booking?.flights.forEach(flight => {
            flight.departureTime = new Date(flight.departureTime);
            flight.arrivalTime = new Date(flight.departureTime);
            flight.arrivalTime.setHours(Math.random() * 8 + 2 + flight.arrivalTime.getHours());
          });
        });
        // failure or no result
        if (!bookings || bookings.length === 0) {
          this.error = {isError: true, message: 'No Booking found', status: null};
          this.bookings = bookings;
        } else {
          this.bookings = bookings;
          this.totalBookings = this.bookingService.totalBookings;
        }
        this.setPage(page);
        this.loading = false;
      }, error => {
        this.loading = false;
        this.error = {isError: true, message: error?.error?.message || error?.message, status: error?.status};
        console.log(error);
      }, () => {
        this.loading = false;
        console.log('complete');
      });
  }

  navigate(page = 0): void {
    this.router.navigate(['bookings'], {queryParams: {offset: page, limit: this.limit}})
      .then(r => console.log('navigated'));
  }

  ngOnInit(): void {
    this.parseQueryParams();
  }

  setPage(page: number): void {
    if (!this.totalBookings || page < 1 || page > this.pager.totalBookings) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalBookings, page, this.limit);
    console.log('pager server:', this.pager);
    // this.pagedBookings = this.bookings.slice(this.pager.startIndex, this.pager.endIndex + 1);
    // console.log('paged bookings:', this.pagedBookings);
    this.pagedBookings = this.bookings;
  }

  /**
   * parse query parameters
   * @private
   */
  private parseQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      // page size
      let limit = 10;
      if (params.get('limit')) {
        limit = +params.get('limit');
        if (!Number.isInteger(limit)) {
          limit = Math.floor(limit);
        }
        if (limit > 40) {
          limit = 40;
        } else if (limit < 10) {
          limit = 10;
        }
      }
      this.limit = limit;
      // page number
      let page = 1;
      if (params.get('offset')) {
        page = +params.get('offset');
        if (!Number.isInteger(page)) {
          page = Math.floor(page);
        }
        if (page < 1) {
          page = 1;
        } else if (page > Math.ceil(this.totalBookings / limit)) {
          page = Math.ceil(this.totalBookings / limit);
          this.error.isError = true;
          return;
        }
      }
      this.getBookings(page);
    });
  }
}
