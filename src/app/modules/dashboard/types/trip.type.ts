import { TripStatus } from '../enums/trip-status.enum';
import { Device } from './device.type';
import { SIM } from './SIM.type';

export interface Trip {
  id: string;
  vehicle: string;
  plateNum: string;
  odometer: string;
  GPS: string;
  device: Device;
  SIM: SIM;
  fleet: string;
  status: TripStatus;
}
