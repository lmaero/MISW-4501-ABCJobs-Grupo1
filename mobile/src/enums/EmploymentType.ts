import {PickerValues} from '../interfaces/components/Picker';
import {employment as employments} from './CandidateProfile';

export const employmentType = employments.map(
  (employment: string): PickerValues => ({
    value: employment,
    label: employment[0].toUpperCase() + employment.slice(1),
  }),
);
