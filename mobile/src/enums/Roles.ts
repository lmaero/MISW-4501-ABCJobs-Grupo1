import {PickerValues} from '../interfaces/components/Picker';
import {roles as rolesValue} from './CandidateProfile';

export const roles = rolesValue.map(
  (employment: string): PickerValues => ({
    label: employment,
    value: employment[0].toLowerCase() + employment.slice(1),
  }),
);
