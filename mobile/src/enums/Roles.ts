import {PickerValues} from '../interfaces/components/Picker';
import {roles as rolesValue} from './CandidateProfile';

export const roles = rolesValue.map(
  (employment: string): PickerValues => ({
    value: employment,
    label: employment[0].toUpperCase() + employment.slice(1),
  }),
);
