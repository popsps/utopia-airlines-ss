import {Deserializable} from './Deserializable';

export class User implements Deserializable {
  // "role": {
  //   "id": 1,
  //   "name": "ADMIN"
  // }
  id: number;
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  role: string;
  password?: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
