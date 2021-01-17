export class Passenger {
  id: number;
  bookingId: bigint;
  givenName: string;
  familyName: string;
  dob: string;
  gender: string;
  address: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
