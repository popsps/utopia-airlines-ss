import {Deserializable} from './Deserializable';
import {Passenger} from './passenger';
import {GuestContact} from './guest-contact';

type Flight = {
  id: bigint;
  route: {
    id: number;
    origin: {
      iataId: string;
      city: string;
    };
    destination: {
      iataId: string;
      city: string;
    };
  };
  departureTime: Date;
  arrivalTime?: Date;
  maxCapacity: number;
  reservedSeats: number;
  passengerCount: number;
  availableSeats: number;
  seatPrice: number;
};

type User = {

  id: number;
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  phone: string;
  name: {
    given: string;
    family: string;
  };
};

export class Booking implements Deserializable {

  public constructor(init?: Partial<Booking>) {
    Object.assign(this, init);
  }

  id: number;
  isActive: boolean;
  // "USER" | "GUEST"
  type: string;
  agent?: User;
  user?: User;
  guest?: GuestContact;
  passengers: Passenger[];
  flights: Flight[];

  static createFrom(booking: Booking, newBooking: any): Booking {
    console.log('init', newBooking);
    booking.id = newBooking.id;
    booking.isActive = newBooking.isActive;
    // booking.user = newBooking.user;
    // booking.agent = newBooking.agent;
    // booking.guest = newBooking.guest;
    // booking.type = newBooking.type;
    booking.passengers = newBooking.passengers.map(passenger => {
      delete passenger?.editable;
      return passenger;
    });
    return booking;
  }

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
