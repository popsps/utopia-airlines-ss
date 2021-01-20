import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../models/Flight';

const floor = (date: Date) => {
  const floored = new Date(date.getTime());
  floored.setHours(0, 0, 0, 0);
  return floored;
};
const ceil = (date: Date) => {
  const ceiled = floor(date);
  ceiled.setDate(ceiled.getDate() + 1);
  return ceiled;
};
const isLessThan = (a: Date, b: Date) => a.getTime() < b.getTime();
const isBetween = (date: Date, min: Date, max: Date) => isLessThan(floor(min), date) && isLessThan(date, ceil(max));

@Pipe({
  name: 'flightDepartureDate',
  pure: false
})
export class FlightDepartureDatePipe implements PipeTransform {


  transform(values: Flight[], date1: Date, date2: Date): Flight[] {
    if (date1 != null && date2 != null)
      return values.filter(flight => isBetween(flight.departureTime, date1, date2));
    if (date1 != null && date2 == null)
      return values.filter(flight => isBetween(flight.departureTime, date1, date1));
    return values;
  }

}
