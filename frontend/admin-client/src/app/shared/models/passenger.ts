export class Passenger {
  id?: number;
  name?: {
    given?: string;
    family?: string;
  };
  dob?: string;
  gender?: string;
  address?: string;
  editable?: boolean;
  public constructor(init?: Partial<Passenger>) {
    Object.assign(this, init);
  }
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  dropEditable(): this {
    delete this.editable;
    return this;
  }
}
