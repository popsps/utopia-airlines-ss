import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BookingService} from '../../shared/services/booking.service';
import {Booking} from '../../shared/models/booking';
import {PagerService} from '../../shared/services/pager.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  filter: BookingFilter;
  error = {isError: false, message: '', status: null};

  constructor(private bookingService: BookingService, private  pagerService: PagerService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  getBookings(url, page = 1): void {
    this.loading = true;
    this.bookingService.getAllBookings(url)
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
        this.error = {isError: true, message: 'No Booking Found', status: null};
        console.log(error);
      }, () => {
        this.loading = false;
        console.log('complete');
      });
  }


  navigate(page = 0): void {
    this.router.navigate(['bookings'], {queryParams: {offset: page, ...this.filter}})
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
    this.pagedBookings = this.bookings;
  }

  /**
   * parse query parameters
   * @private
   */
  private parseQueryParams(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const isActive = params.get('isActive');
      const fName = params.get('fName');
      const lName = params.get('lName');
      const type = params.get('type');
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
          this.error.isError = true;
          this.error.message = 'No booking found';
          console.log(page);
          return;
        } else if (page > Math.ceil(this.totalBookings / limit)) {
          page = Math.ceil(this.totalBookings / limit);
          this.error.isError = true;
          return;
        }
      }
      this.filter = {limit, fName, lName, isActive, type};
      const url = this.buildUrl(type, page);
      this.getBookings(url, page);
    });
  }

  private buildUrl(type: string, page: number): string {
    const offset = (page - 1) * this.limit;
    type = (type) ? `/${type}/` : '';
    let url = `${environment.bookingApiUrl}${type}?offset=${offset}`;
    if (this.filter) {
      for (const [key, value] of Object.entries(this.filter)) {
        if (value) {
          url += `&${key}=${value}`;
        }
      }
    }
    return url;
  }

  onFilterChange(filter): void {
    this.filter = filter;
    console.log('this.filter', this.filter);
    this.navigate(1);
  }
}
