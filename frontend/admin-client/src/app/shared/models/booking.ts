import {Deserializable} from './Deserializable';

export class Booking implements Deserializable {
  id: bigint;
  isActive: boolean;
  confirmationCode: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
