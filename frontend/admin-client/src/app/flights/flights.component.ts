import { Component, OnInit } from '@angular/core';

import { environment } from "../../environments/environment";

import { HttpService } from "../shared/services/http.service";

import { Flight } from "../shared/models/Flight";
import { FormControl } from '@angular/forms';


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
  origin: string;
  destination: string;
  departureDate: Date;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights() {
    this.flights = { state: "pending" };
    this.httpService.get(`${environment.flightApiUrl}`).subscribe(
      (res: any[]) => {
        this.flights = {
          state: "done",
          data: res.map(obj => new Flight().deserialize(obj))
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

}
