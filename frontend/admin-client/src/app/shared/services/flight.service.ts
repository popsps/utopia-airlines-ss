import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../../environments/environment";
import { Flight } from "../models/Flight";

export interface PaginatedFlightResult {
  total: number;
  offset: number;
  count: number,
  results: Flight[];
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private static parseFlights: OperatorFunction<any, PaginatedFlightResult> = map(({ results, ...rest }: any) => ({
    ...rest,
    results: results.map(obj => new Flight().deserialize(obj))
  }));
  constructor(private http: HttpClient) { }

  getAll(): Observable<PaginatedFlightResult> {
    return FlightService.parseFlights(this.http.get(environment.flightApiUrl));
  };

  post(flight: any) {
    return this.http.post(environment.flightApiUrl, flight, { headers: { "Content-Type": "application/json" } });
  }
}
