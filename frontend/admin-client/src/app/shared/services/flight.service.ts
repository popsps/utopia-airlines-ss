import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../../environments/environment";
import { Flight } from "../models/Flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private static parseFlights: OperatorFunction<any, Flight[]> = map((flights: any) => flights.map(obj => new Flight().deserialize(obj)));
  constructor(private http: HttpClient) { }

  getAll(): Observable<Flight[]> {
    return FlightService.parseFlights(this.http.get(environment.flightApiUrl));
  }
}
