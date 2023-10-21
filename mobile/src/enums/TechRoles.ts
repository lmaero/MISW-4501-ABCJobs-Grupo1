import {PickerValues} from '../interfaces/components/Picker';
import {techRole as techRoles} from './CandidateProfile';

export const techRolesValues = techRoles.map(
  (role: string): PickerValues => ({
    label: role,
    value: role[0].toLowerCase() + role.slice(1),
  }),
);
