export class Passenger {
  id: number;
  bookingId: bigint;
  name: {
    given: string;
    family: string;
  };
  dob: string;
  gender: string;
  address: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
