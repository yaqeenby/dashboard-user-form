export interface User {
  profileImg?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone?: string;
  enableRfid?: boolean;
  rfid?: string;
  role: string;
  department: string;
  fleet?: string;
}
