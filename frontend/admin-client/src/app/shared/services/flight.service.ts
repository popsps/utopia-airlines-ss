import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from "../../../environments/environment";
import { Flight } from "../models/Flight";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Flight[]> {
    const parseFlights = map((flights: any) => flights.map(obj => new Flight().deserialize(obj)));
    return parseFlights(this.http.get(environment.flightApiUrl));
  }
}
