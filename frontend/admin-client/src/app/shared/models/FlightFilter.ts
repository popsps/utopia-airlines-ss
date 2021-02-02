
export interface FlightFilter {
  origin?: string;
  destination?: string;
  departureDateRange: [Date?, Date?];
}