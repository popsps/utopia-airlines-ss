import { Deserializable } from './Deserializable';
import { Route } from './Route';

export class Flight implements Deserializable {
  id: bigint;
  route: Route;
  departureTime: Date;
  maxCapacity: number;
  reservedSeats: number;
  passengerCount: number;
  availableSeats: number;
  seatPrice: number;

  deserialize(input: any): this {
    const { routeId, route, departureTime, ...rest } = input;
    Object.assign(this, rest);
    this.route = new Route().deserialize(route);
    this.departureTime = new Date(departureTime);
    return this;
  }
}
