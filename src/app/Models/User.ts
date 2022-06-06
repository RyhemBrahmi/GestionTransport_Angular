import { Roles } from './Roles';

export interface User {
    uid: string;
    name: string;
    roles: Roles;
  }