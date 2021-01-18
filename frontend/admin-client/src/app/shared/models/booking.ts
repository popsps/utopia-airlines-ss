import {Deserializable} from './Deserializable';
import {Passenger} from './passenger';

export class Booking implements Deserializable {
  id: number;
  isActive: boolean;
  confirmationCode: string;
  passengers: Passenger[];
  // should be removed. Is here due to schema mismatch
  bookerId: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    try {
      this.passengers = input.passengers.map(passenger =>
        new Passenger().deserialize(passenger));
    } catch (err) {
    }
    return this;
  }
}
