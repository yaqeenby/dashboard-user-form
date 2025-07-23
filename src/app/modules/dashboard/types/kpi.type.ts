export interface KPIs {
  activeTrips: KPIvalue;
  activeVehicles: KPIvalue;
  underMaintenance: KPIvalue;
  inActiveTrips: KPIvalue;
  stoppedVehicles: KPIvalue;
  queueMaintenance: KPIvalue;
  totalDepartments: KPIvalue;
  totalFleets: KPIvalue;
  totalDrivers: KPIvalue;
}

export interface KPIvalue {
  value: number;
  total?: number;
  label: string;
  opacity?: number;
}
