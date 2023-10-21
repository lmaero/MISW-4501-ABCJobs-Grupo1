import {PickerValues} from '../interfaces/components/Picker';
import {employment as employments} from './CandidateProfile';

export const employmentType = employments.map(
  (employment: string): PickerValues => ({
    label: employment,
    value: employment[0].toLowerCase() + employment.slice(1),
  }),
);
