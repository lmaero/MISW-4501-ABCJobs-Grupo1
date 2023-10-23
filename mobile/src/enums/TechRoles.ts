import {PickerValues} from '../interfaces/components/Picker';
import {techRole as techRoles} from './CandidateProfile';

export const techRolesValues = techRoles.map(
  (role: string): PickerValues => ({
    value: role,
    label: role[0].toUpperCase() + role.slice(1),
  }),
);
