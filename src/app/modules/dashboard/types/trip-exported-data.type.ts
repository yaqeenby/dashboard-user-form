import { TripStatus } from '../../../enums/trip-status.enum';
import { Shift } from './shift.type';
import { Trip } from './trip.type';

export class TripExportedData {
  id: string;
  vehicle: string;
  plateNum: string;
  odometer: string;
  GPS: string;
  deviceId: string;
  deviceName: string;
  deviceSerial: string;
  SIMId: string;
  SIMName: string;
  SIMSize: string;
  fleet: string;
  status: TripStatus;
  shiftId: string;
  shiftName: string;
  startDate: string;
  endDate: string;

  constructor(trip: Trip, shift: Shift) {
    this.id = trip.id;
    this.vehicle = trip.vehicle;
    this.plateNum = trip.plateNum;
    this.odometer = trip.odometer;
    this.GPS = trip.GPS;
    this.deviceId = trip.device?.id;
    this.deviceName = trip.device?.name;
    this.deviceSerial = trip.device?.serial;
    this.SIMId = trip.SIM?.id;
    this.SIMName = trip.SIM?.name;
    this.SIMSize = trip.SIM?.size;
    this.fleet = trip.fleet;
    this.status = trip.status;
    this.shiftId = shift.id;
    this.shiftName = shift.name;
    this.startDate = shift.startDate;
    this.endDate = shift.endDate;
  }

  toTrip(): Trip {
    return {
      id: this.id,
      vehicle: this.vehicle,
      plateNum: this.plateNum,
      odometer: this.odometer,
      GPS: this.GPS,
      device: {
        id: this.deviceId,
        name: this.deviceName,
        serial: this.deviceSerial,
      },
      SIM: {
        id: this.SIMId,
        name: this.SIMName,
        size: this.SIMSize,
      },
      fleet: this.fleet,
      status: this.status,
    };
  }
}
