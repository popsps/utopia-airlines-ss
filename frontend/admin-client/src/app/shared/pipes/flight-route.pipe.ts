import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

@Pipe({
  name: 'flightRoute'
})
export class FlightRoutePipe implements PipeTransform {

  transform(flights: Flight[], origin: string, destination: string): unknown {
    if (origin)
    {
      origin = origin.toUpperCase();
      flights = flights.filter(flight => flight.route.originId.startsWith(origin));
    }
    if (destination)
    {
      destination = destination.toUpperCase();
      flights = flights.filter(flight => flight.route.destinationId.startsWith(destination));
    }
    return flights;
  }

}
