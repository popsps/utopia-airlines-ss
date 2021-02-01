export class Passenger {
  id: number;
  name: {
    given: string;
    family: string;
  };
  dob: string;
  gender: string;
  address: string;
  editable = false;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
