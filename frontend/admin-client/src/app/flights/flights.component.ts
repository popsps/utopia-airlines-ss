import { Component, OnInit } from '@angular/core';

import { FlightService, PaginatedFlightResult } from "../shared/services/flight.service";

import { FlightFilter } from '../shared/models/FlightFilter';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  private static PAGE_SIZE = 10;

  pageNum = 1;
  flights: {
    state: "pending" | "done" | "error";
    error?: any;
    data?: PaginatedFlightResult;
  };

  constructor(private flightService: FlightService) {
    this.flights = {
      state: "pending",
    };
  }

  ngOnInit(): void {
    this.loadFlights({});
  }

  loadFlights(filter: FlightFilter) {
    this.flights.state = "pending";
    this.flightService.getAll({
      ...filter,
      offset: (this.pageNum - 1) * FlightsComponent.PAGE_SIZE, limit: FlightsComponent.PAGE_SIZE
    }).subscribe(
      (data) => {
        this.flights = {
          ...this.flights,
          state: "done",
          data
        };
      },
      (error) => {
        this.flights = {
          ...this.flights,
          state: "error",
          error
        };
      },

    );
  }

  onFilterChange(filter) {
    this.pageNum = 0;
    this.loadFlights(filter);
  }

  getPageSize() {
    return FlightsComponent.PAGE_SIZE;
  }

  setPageNum(pageNum) {
    this.pageNum = pageNum;
  }

}
