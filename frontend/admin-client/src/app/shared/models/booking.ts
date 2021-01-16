import {Deserializable} from './Deserializable';
import {Passenger} from './passenger';

export class Booking implements Deserializable {
  id: number;
  isActive: boolean;
  confirmationCode: string;
  passengers: Passenger[];

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
