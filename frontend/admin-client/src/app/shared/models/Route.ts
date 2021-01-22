import { Deserializable } from './Deserializable';

export class Route implements Deserializable {
  id: bigint;
  originId: string;
  destinationId: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
