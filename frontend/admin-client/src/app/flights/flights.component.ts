import { Component, OnInit } from '@angular/core';

import { FlightService } from "../shared/services/flight.service";

import { Flight } from "../shared/models/Flight";
import { FlightFilter } from '../shared/models/FlightFilter';


@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent implements OnInit {
  flights: {
    state: "pending" | "done" | "error";
    error?: any;
    data?: Flight[];
  };

  filter: FlightFilter = {
    departureDateRange: []
  };

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flights = { state: "pending" };
    this.flightService.getAll().subscribe(
      (res: any[]) => {
        this.flights = {
          state: "done",
          data: res.sort((a, b) => a.departureTime.getTime() - b.departureTime.getTime())
        };
      },
      (error) => {
        this.flights = {
          state: "error",
          error
        };
      },

    );
  }

  onFilterChange(filter) {
    this.filter = filter;
  }

}
