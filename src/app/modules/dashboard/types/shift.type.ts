import { Trip } from './trip.type';

export interface Shift {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  trips: Trip[];
}
