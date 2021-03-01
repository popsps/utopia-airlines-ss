import {Component, OnInit} from '@angular/core';

import {FlightService, PaginatedFlightResult} from '../shared/services/flight.service';

import {FlightFilter} from '../shared/models/FlightFilter';
import {FileSaverService} from 'ngx-filesaver';
import {Flight} from '../shared/models/Flight';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  private static PAGE_SIZE = 10;

  pageNum = 1;
  flights: {
    state: 'pending' | 'done' | 'error';
    error?: any;
    data?: PaginatedFlightResult;
  };

  filter: FlightFilter = {};

  constructor(private flightService: FlightService, private fileSaver: FileSaverService) {
    this.flights = {
      state: 'pending',
    };
  }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.flightService.getAll({
      ...this.filter,
      offset: (this.pageNum - 1) * FlightsComponent.PAGE_SIZE,
      limit: FlightsComponent.PAGE_SIZE
    }).subscribe(
      (data) => {
        this.flights = {
          ...this.flights,
          state: 'done',
          data
        };
        console.log('new flights:', this.flights.data);
      },
      (error) => {
        this.flights = {
          ...this.flights,
          state: 'error',
          error
        };
        console.log('flight error:', error, this.flights);
      },
    );
  }

  getPageSize(): number {
    return FlightsComponent.PAGE_SIZE;
  }

  getTotalPageCount(): number {
    if (this.flights.state !== 'done') {
      return 1;
    }
    return Math.ceil(this.flights.data.total / FlightsComponent.PAGE_SIZE);
  }

  onFilterChange(filter): void {
    this.pageNum = 1;
    this.filter = filter;
    this.loadFlights();
  }

  onPageNumChange(pageNum): void {
    this.pageNum = pageNum;
    this.loadFlights();
  }

  onSaveCSV(): void {
    const data = this.flights.data.results;
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]); // build header
    console.log('flights fields', Flight.allKeys());
    const csv = data.map((row) => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    console.log(header);
    console.log(csv);
    const csvArray = csv.join('\r\n');
    console.log(csvArray);
    // const csvBlob = new Blob([csvArray], {type: 'text/csv;charset=utf-8'});
    // this.fileSaver.save(csvBlob, 'flights.csv');
  }

}
