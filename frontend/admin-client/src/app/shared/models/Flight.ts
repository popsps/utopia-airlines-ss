import { Deserializable } from './Deserializable';
import { Route } from './Route';
// {
//             "route": {
//                 "id": 100,
//                 "origin": {
//                     "iataId": "BTV",
//                     "name": "Burlington International Airport",
//                     "city": "Burlington",
//                     "country": "United States",
//                     "timezone": -5,
//                     "coords": {
//                         "latitude": -73,
//                         "longitude": 44,
//                         "altitude": 335
//                     }
//                 },
//                 "destination": {
//                     "iataId": "BEC",
//                     "name": "Beech Factory Airport",
//                     "city": "Wichita",
//                     "country": "United States",
//                     "timezone": -6,
//                     "coords": {
//                         "latitude": -97,
//                         "longitude": 38,
//                         "altitude": 1408
//                     }
//                 }
//             },
//             "airplane": {
//                 "id": 1
//             },

//         },
export class Flight implements Deserializable {
  id: bigint;
  routeId: number;
  route: Route;
  airplaneId: number;
  departureTime: Date;
  // arrivalTime: Date;
  seats: {
    total: number;
    reserved?: number;
    booked?: number;
    available: number;
    price: number;
  };

  deserialize(input: any): this {
    const { route, departureTime, ...rest } = input;
    Object.assign(this, rest);
    this.route = new Route().deserialize(route);
    this.departureTime = new Date(departureTime);
    this.departureTime.setFullYear(2021);
    return this;
  }
}
